const pool = require("../../config/database");
const { v4: uuidv4 } = require('uuid');

module.exports = {
  createPharmacy: (data, callBack) => {
    const { name_p, address_u, latitude, longitude, phone_p } = data;

    pool.query(
      `INSERT INTO pharmacy (name_p, address_u, latitude, longitude, phone_p) VALUES (?, ?, ?, ?, ?)`,
      [name_p, address_u, latitude, longitude, phone_p],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPharmacies: (callBack) => {
    pool.query(
      `SELECT * FROM pharmacy`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPharmacyById: (id, callBack) => {
    pool.query(
      `SELECT * FROM pharmacy WHERE id_p = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getPharmacyByName: (name, callBack) => {
    pool.query(
      `SELECT * FROM pharmacy WHERE name_p = ?`,
      [name],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updatePharmacy: (data, callBack) => {
    const { id_p, name_p, address_u, latitude, longitude, phone_p } = data;
    pool.query(
      `UPDATE pharmacy SET  name_p=?, address_u=?, latitude=?, longitude=?, phone_p=? WHERE id_p = ?`,
      [name_p, address_u, latitude, longitude, phone_p, id_p],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPharmacists: (pharmacyId, callBack) => {
    pool.query(
      `SELECT pharmacists.user
      FROM pharmacists
      JOIN pharmacy ON pharmacists.id_p = pharmacy.id_p
      WHERE pharmacy.id_p = ?`,
      [pharmacyId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPharmaciesByDistance: (latReference, lonReference, callBack) => {
    pool.query(
      `SELECT
          id_p,
          name_p,
          address_u,
          latitude,
          longitude,
          phone_p,
          6371 * 2 * ASIN(
              SQRT(
                  POW(SIN(RADIANS(latitude - ?) / 2), 2) +
                  COS(RADIANS(?)) * COS(RADIANS(latitude)) *
                  POW(SIN(RADIANS(longitude - ?) / 2), 2)
              )
          ) AS distance
      FROM
          pharmacy
      ORDER BY
          distance ASC`,
      [latReference, latReference, lonReference],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPeriodes: (pharmacyId, callBack) => {
    pool.query(
      `SELECT pharmacy_garde.id_period, pharmacy_garde.id_p, periode_garde.start, periode_garde.end
      FROM pharmacy_garde
      JOIN pharmacy ON pharmacy_garde.id_p = pharmacy.id_p
      JOIN periode_garde ON pharmacy_garde.id_period = periode_garde.id_period
      WHERE pharmacy_garde.id_p = ?`,
      [pharmacyId],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deletePharmacy: (id, callBack) => {
    pool.query(
      `DELETE FROM pharmacy WHERE id_p = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
getPharmaciesByDistance: (latReference, lonReference, callBack) => {
  pool.query(
    `SELECT
        pharmacy.id_p,
        pharmacy.name_p,
        pharmacy.address_u,
        pharmacy.latitude,
        pharmacy.longitude,
        pharmacy.phone_p,
        6371 * ACOS(
            COS(RADIANS(${latReference})) * COS(RADIANS(latitude)) *
            COS(RADIANS(pharmacy.longitude) - RADIANS(${lonReference})) +
            SIN(RADIANS(${latReference})) * SIN(RADIANS(pharmacy.latitude))
        ) AS distance
    FROM
        pharmacy join pharmacy_garde on pharmacy.id_p = pharmacy_garde.id_p
        where pharmacy_garde.endTime >= NOW()
        and 6371 * ACOS(
            COS(RADIANS(${latReference})) * COS(RADIANS(latitude)) *
            COS(RADIANS(pharmacy.longitude) - RADIANS(${lonReference})) +
            SIN(RADIANS(${latReference})) * SIN(RADIANS(pharmacy.latitude))
        ) < 10
    ORDER BY
        distance ASC
        limit 10
        `
        ,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
},

  createGardePharmacy: (data, callBack) => {
    const { id_p,startTime,endTime} = data;
    console.log(data);
    pool.query(
      `INSERT INTO pharmacy_garde (id_p,startTime,endTime) VALUES (?, ?, ?)`,
      [id_p,startTime, endTime],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deletePharmacyGarde: (id, callBack) => {
    pool.query(
      `DELETE FROM pharmacy_garde WHERE id_period = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPharmacyDeGarde : (callBack) => {
    pool.query(
      `SELECT pharmacy.id_p, pharmacy.name_p, pharmacy_garde.startTime, pharmacy_garde.endTime,pharmacy.address_u, pharmacy.phone_p,pharmacy_garde.id_period
      FROM pharmacy JOIN pharmacy_garde ON pharmacy.id_p = pharmacy_garde.id_p
      where  pharmacy_garde.endTime >= NOW()
      `,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPharmacyExceptGarde : (callBack) => {
    //get pharmacy that not setted garde
    pool.query(
      `SELECT pharmacy.id_p, pharmacy.name_p, pharmacy_garde.startTime, pharmacy_garde.endTime,pharmacy.address_u, pharmacy.phone_p
      FROM pharmacy
      LEFT JOIN pharmacy_garde ON pharmacy.id_p = pharmacy_garde.id_p
      WHERE pharmacy_garde.id_p IS NULL;
      `,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
