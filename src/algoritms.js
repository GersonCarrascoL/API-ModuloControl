let q = require('../src/queries');

const indice_name = 'alumno.ape_nom';
const indice_concepto = 'concepto.concepto';
const indice_voucher = 'numero';
const indice_fecha = 'recaudaciones.fecha';
const indice_recaudacion = "id_rec";
const indice_flag = 'validado';
const indice_dni = 'alumno.dni';
const indice_dnim = 'alumno_programa.dni_m';
const indice_obs = 'observacion';
const indice_codigo = 'alumno.codigo';
const indice_codigom = 'alumno_programa.cod_alumno'
const indice_ubic = 'id_ubicacion';

function when_construct(ListIndices, ListValor, tipo) {
    let when = "";
    let valores = ListValor.split('¬');
    let indices = ListIndices.split(',');
    if (ListIndices != null && ListValor != null) {
        for (let i = 0; i < valores.length; i++) {
            if (tipo === indice_obs) valores[i] = "'" + valores[i] + "'";
            when = when + "WHEN " + indices[i] + " THEN " + valores[i] + " ";
        }
        when = when + "END";
    }
    return when;
}
function where_construct(ListValor, indice) {
    let where = "";
    if (ListValor != null) {
        // Si el valor del req.name tiene varios valores los pone en un array
        // palabra por palabra
        let valores = ListValor.split(',');
        // Se limpia los espacios de cada valor
        for (let i = 0; i < valores.length; i++) valores[i] = valores[i].trim();
        // Se verifica si el indice que se paso es exactamente el de indice name
        if (indice === indice_name) {
            // Se declara el tamaño del array para pasarlo por el for    
            let tam = valores.length;
            for (let i = 0; i < tam; i++) {
                // cada valor del array se le pone en una variable
                let noms = valores[i].split(' ');
                switch (noms.length) {
                    case 1:
                        where = "( ";
                        for (let i = 0; i < valores.length; i++) {
                            let noms = valores[i].split(' ');
                            noms[0] = noms[0].toUpperCase();
                            if (noms.length === 2) {
                                noms[1] = noms[1].toUpperCase();
                                where = where + indice + " SIMILAR TO '%" + noms[0] + "%" + noms[1] + "%' OR " + indice +
                                    " SIMILAR TO '%" + noms[1] + "%" + noms[0] + "%' OR ";
                            } else
                                where = where + indice + " SIMILAR TO '%" + noms[0] + "%' OR ";
                        }
                        where = where.slice(0, -3);
                        where = where + ")";
                        return where;
                    case 2:
                        where = "( ";
                        for (let i = 0; i < valores.length; i++) {
                            let noms = valores[i].split(' ');
                            noms[0] = noms[0].toUpperCase();
                            if (noms.length === 2) {
                                noms[1] = noms[1].toUpperCase();
                                where = where + indice + " SIMILAR TO '%" + noms[0] + "%" + noms[1] + "%' OR " + indice +
                                    " SIMILAR TO '%" + noms[1] + "%" + noms[0] + "%' OR ";
                            } else
                                where = where + indice + " SIMILAR TO '%" + noms[0] + "%' OR ";
                        }
                        where = where.slice(0, -3);
                        where = where + ")";
                        return where;
                    case 3:
                        where = "( ";
                        for (let i = 0; i < valores.length; i++) {
                            let noms = valores[i].split(' ');
                            noms[0] = noms[0].toUpperCase();
                            noms[1] = noms[1].toUpperCase();
                            noms[2] = noms[2].toUpperCase();
                            where = where + indice + " SIMILAR TO '%" + noms[0] + "%" + noms[1] + "%" + noms[2] + "%' OR " + indice +
                                " SIMILAR TO '%" + noms[1] + "%" + noms[2] + "%" + noms[0] + "%' OR ";
                        }
                        where = where.slice(0, -3);
                        where = where + ")";
                        return where;
                    case 4:
                        where = "( ";
                        for (let i = 0; i < valores.length; i++) {
                            let noms = valores[i].split(' ');
                            noms[0] = noms[0].toUpperCase();
                            noms[1] = noms[1].toUpperCase();
                            noms[2] = noms[2].toUpperCase();
                            noms[3] = noms[3].toUpperCase();
                            where = where + indice + " SIMILAR TO '%" + noms[0] + "%" + noms[1] + "%" + noms[2] + "%"
                                + noms[3] + "%' OR " + indice +
                                " SIMILAR TO '%" + noms[1] + "%" + noms[2] + "%" + noms[3] + "%" + noms[0] + "%' OR ";
                        }
                        where = where.slice(0, -3);
                        where = where + ")";
                        return where;
                    case 5:
                        where = "( ";
                        for (let i = 0; i < valores.length; i++) {
                            let noms = valores[i].split(' ');
                            noms[0] = noms[0].toUpperCase();
                            noms[1] = noms[1].toUpperCase();
                            noms[2] = noms[2].toUpperCase();
                            noms[3] = noms[3].toUpperCase();
                            noms[4] = noms[4].toUpperCase();
                            where = where + indice + " SIMILAR TO '%" + noms[0] + "%" + noms[1] + "%" + noms[2] + "%" + noms[3] + "%"
                                + noms[4] + "%' OR " + indice +
                                " SIMILAR TO '%" + noms[1] + "%" + noms[2] + "%" + noms[3] + "%" + noms[4] + "%" + noms[0] + "%' OR ";
                        }
                        where = where.slice(0, -3);
                        where = where + ")";
                        return where;
                    case 6:
                        where = "( ";
                        for (let i = 0; i < valores.length; i++) {
                            let noms = valores[i].split(' ');
                            noms[0] = noms[0].toUpperCase();
                            noms[1] = noms[1].toUpperCase();
                            noms[2] = noms[2].toUpperCase();
                            noms[3] = noms[3].toUpperCase();
                            noms[4] = noms[4].toUpperCase();
                            noms[5] = noms[5].toUpperCase();
                            where = where + indice + " SIMILAR TO '%" + noms[0] + "%" + noms[1] + "%" + noms[2] + "%" + noms[3] + "%"
                                + noms[4] + "%" + noms[5] + "%' OR " + indice +
                                " SIMILAR TO '%" + noms[1] + "%" + noms[2] + "%" + noms[3] + "%" + noms[4]
                                + "%" + noms[5] + "%" + noms[0] + "%' OR ";
                        }
                        where = where.slice(0, -3);
                        where = where + ")";
                        return where;
                    case 7:
                        where = "( ";
                        for (let i = 0; i < valores.length; i++) {
                            let noms = valores[i].split(' ');
                            noms[0] = noms[0].toUpperCase();
                            noms[1] = noms[1].toUpperCase();
                            noms[2] = noms[2].toUpperCase();
                            noms[3] = noms[3].toUpperCase();
                            noms[4] = noms[4].toUpperCase();
                            noms[5] = noms[5].toUpperCase();
                            noms[6] = noms[6].toUpperCase();
                            where = where + indice + " SIMILAR TO '%" + noms[0] + "%" + noms[1] + "%" + noms[2] + "%" + noms[3] + "%"
                                + noms[4] + "%" + noms[5] + "%" + noms[6] + "%' OR " + indice +
                                " SIMILAR TO '%" + noms[1] + "%" + noms[2] + "%" + noms[3] + "%" + noms[4]
                                + "%" + noms[5] + "%" + noms[6] + "%" + noms[0] + "%' OR ";
                        }
                        where = where.slice(0, -3);
                        where = where + ")";
                        return where;
                    case 8:
                        noms[0] = noms[0].toUpperCase();
                        noms[1] = noms[1].toUpperCase();
                        noms[2] = noms[2].toUpperCase();
                        noms[3] = noms[3].toUpperCase();
                        noms[4] = noms[4].toUpperCase();
                        noms[5] = noms[5].toUpperCase();
                        noms[6] = noms[6].toUpperCase();
                        noms[7] = noms[7].toUpperCase();
                        valores.push(`${noms[0]} ${noms[1]} ${noms[2]} ${noms[3]} ${noms[4]} ${noms[5]} ${noms[6]} ${noms[7]}`);
                        valores.push(`${noms[2]} ${noms[3]} ${noms[4]} ${noms[5]} ${noms[6]} ${noms[7]} ${noms[0]} ${noms[1]}`);
                }
            }
        }
        let valorcomillas = "";
        for (let i = 0; i < valores.length; i++)
            valorcomillas = valorcomillas + "'" + valores[i] + "',";
        valorcomillas = valorcomillas.slice(0, -1);

        where = where + indice + " = " + valorcomillas + "";
        console.log(where)
    } else
        where = 'true';
    return where;
}
function getAll(req, res, next) {
    q.SelectCollection(req, res, next, "");
}
function getComplet(req, res, next) {
    let jsonR = req.body;
    let whereperiod;
    let ListNames = jsonR.nombre;
    let ListConcepts = jsonR.id_concepto;
    let Listvoucher = jsonR.voucher;
    let IPeriod = "'" + jsonR.periodoI + "'";
    let FPeriod = "'" + jsonR.periodoF + "'";
    let ListDNI = jsonR.dni;
    let ListCodigo = jsonR.codigo;
    let hoy = new Date();
    if (ListNames === "") ListNames = null;
    if (ListConcepts === "") ListConcepts = null;
    if (Listvoucher === "") Listvoucher = null;
    if (ListDNI === "") ListDNI = null;
    if (ListCodigo === "") ListCodigo = null;
    if (jsonR.periodoI === null || jsonR.periodoI === "") IPeriod = "'0001-01-01'";
    if (jsonR.periodoF === null || jsonR.periodoF === "") FPeriod = "'" + hoy.getFullYear() + '-' + hoy.getMonth() + '-' + hoy.getDate() + "'";
    if ((jsonR.periodoI === null || jsonR.periodoI === "") && (jsonR.periodoF === null || jsonR.periodoF === ""))
        whereperiod = 'true';
    else {
        if (jsonR.periodoF === jsonR.periodoI) {
            FPeriod = sumarDias(new Date(IPeriod), 1);
            whereperiod = "(" + indice_fecha + " < '" + FPeriod.toDateString() + "' AND " + indice_fecha + " >= " + IPeriod + " " + ")";
        } else
            whereperiod = "(" + indice_fecha + " BETWEEN to_date(" + IPeriod + ",'YYYY-MM-DD') AND to_date(" + FPeriod + ",'YYYY-MM-DD'))";
    }

    let where = where_construct(ListNames, indice_name) + " AND "
        /*+ whereperiod + " AND "
        + where_construct(Listvoucher, indice_voucher) + " AND "
        + where_construct(ListConcepts, indice_concepto) + " AND "
        + "(" + where_construct(ListDNI, indice_dni) + " OR " + where_construct(ListDNI, indice_dnim) + ") AND "
        + "(" + where_construct(ListCodigo, indice_codigom) + " OR " + where_construct(ListCodigo, indice_codigo) + ")"
    " AND clase_pagos.id_clase_pagos IN (select id_clase_pagos from configuracion where estado = 'S') ";*/
        + whereperiod + " AND "
        + where_construct(Listvoucher, indice_voucher) + " AND "
        + where_construct(ListConcepts, indice_concepto) + " AND "
        + where_construct(ListDNI, indice_dnim) + " AND "
        + where_construct(ListCodigo, indice_codigom) +
        " AND clase_pagos.id_clase_pagos IN (select id_clase_pagos from configuracion where estado = 'S') ";

    console.log(where)
    q.SelectCollection(req, res, next, where);
}
function validate(req, res, next) {
    let jsonR = req.body;
    let indices = "";
    let check = "";
    let obs = "";
    let ubic = "";
    console.log(jsonR);
    for (let i in jsonR) {
        if (jsonR.hasOwnProperty(i)) {
            indices = indices + ',' + jsonR[i].id_rec;
            check = check + '¬' + jsonR[i].check;
            obs = obs + '¬' + jsonR[i].obs;
            ubic = ubic + '¬' + jsonR[i].ubic;
        }
    }

    indices = indices.slice(1); check = check.slice(1); obs = obs.slice(1); ubic = ubic.slice(1);
    console.log(indices);
    console.log(check);
    console.log(obs);
    console.log(ubic);
    if (indices != null && check != null && obs != null && ubic != null) {
        let v = when_construct(indices, check);
        let v2 = when_construct(indices, obs, indice_obs);
        let v3 = when_construct(indices, ubic);
        q.UpdateQuery(req, res, next, v, v2, v3, indices);
    }
}
function updateObservation(req, res, next) {
    let idrecaudation = "'" + req.body.idrecaudacion + "'",
        recaudation_message = "'" + req.body.mensaje + "'";
    q.UpdateObservation(req, res, next, idrecaudation, recaudation_message)
}
function getObservation(req,res,next){
    let idRecaudacion = req.params.id;
    q.GetObservation(req,res,next,idRecaudacion);
}
function insertNewCollection(req, res, next) {
    let jsonR = req.body;
    let va = "('" + jsonR.id_alum + "'," +
        "'" + jsonR.id_concepto + "', '2103', '" + jsonR.id_ubicacion + "','" + jsonR.cod_alum + "'," +
        "'" + jsonR.numero + "','" + jsonR.importe + "','" + jsonR.observacion + "','" + jsonR.fecha + "'," +
        jsonR.validado + ",'" + jsonR.id_tipo + "','"+ jsonR.observacion_upg +"','"+ jsonR.moneda+"')";
    q.InsertQuery(req, res, next, va);
}
function getAllConcepts(req, res, next) {
    q.SelectGeneral(req, res, next, "concepto");
}
function getAllTypes(req, res, next) {
    q.SelectGeneral(req, res, next, "tipo");
}
function getReceipt(req,res,next){
    let id = req.params.id;
    q.GetReceipt(req,res,next,id);
}
function getAllUbications(req, res, next) {
    q.SelectGeneral(req, res, next, "ubicacion");
}
function getAllCoins(req, res, next){
    q.SelectGeneral(req, res, next, "moneda");
}
function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}
module.exports = {
    getAll: getAll,
    getComplet: getComplet,
    validate: validate,
    updateObservation: updateObservation,
    getObservation:getObservation,
    insertNewCollection: insertNewCollection,
    getAllConcepts: getAllConcepts,
    getAllTypes: getAllTypes,
    getReceipt: getReceipt,
    getAllUbications: getAllUbications,
    getAllCoins: getAllCoins,
    i_name: indice_name,
    i_concepto: indice_concepto,
    i_voucher: indice_voucher,
    i_fecha: indice_fecha,
    i_recaudacion: indice_recaudacion,
    i_flag: indice_flag,
    i_dni: indice_dni,
    i_obs: indice_obs,
    i_codigo: indice_codigo,
    i_ubic: indice_ubic
};
