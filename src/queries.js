let cn = require('../src/dbconnection');
let db = cn.connection;
const numeral = require('numeral');

function SelectCollection(req, res, next, whereIN){
    let where = "WHERE "+whereIN;
    if (whereIN === "") where = "";

    let query = 
    "SELECT " +   
    "CASE " +
        "WHEN alumno_programa.dni_m IS NOT NULL " +
        "THEN alumno_programa.dni_m " +
        "ELSE alumno.dni " +
    "END AS dni, " +
    "concepto.concepto as concepto, " +
    "recaudaciones.numero as recibo, " + 
    "recaudaciones.id_rec, " +
    "recaudaciones.importe, " +
    "recaudaciones.fecha, " +
    "recaudaciones.id_ubicacion, " + 
    "recaudaciones.observacion_upg, " +
    "recaudaciones.observacion, " +
    "recaudaciones.validado, " +
    "ubicacion.descripcion as ubicacion, "+
    "tipo.descripcion as tipo, "+
    "CASE " +
        "WHEN alumno_alumno_programa.cod_alumno IS NOT NULL "+
        "THEN alumno_alumno_programa.cod_alumno "+
        "ELSE alumno.codigo "+
        // "WHEN (select a.cod_alumno from alumno_alumno_programa a where a.id_alum = alumno.id_alum) != alumno.codigo " +
        // "THEN (select a.cod_alumno from alumno_alumno_programa a where a.id_alum = alumno.id_alum) " +
        // "WHEN NOT EXISTS(select a.cod_alumno from alumno_alumno_programa a where a.id_alum = alumno.id_alum) " + 
        // "THEN alumno.codigo " + 
        // "WHEN (select a.cod_alumno from alumno_alumno_programa a where a.id_alum = alumno.id_alum) = alumno.codigo " +
        // "THEN (select a.cod_alumno from alumno_alumno_programa a where a.id_alum = alumno.id_alum) " +
    "END AS codigo, "+
    "alumno.ape_nom as Nombre " +
    "FROM recaudaciones " +
    "INNER JOIN alumno ON recaudaciones.id_alum = alumno.id_alum " + 
    "JOIN concepto ON recaudaciones.id_concepto = concepto.id_concepto " +
    "JOIN clase_pagos ON concepto.id_clase_pagos = clase_pagos.id_clase_pagos " +
    "INNER JOIN alumno_alumno_programa ON alumno_alumno_programa.id_alum = alumno.id_alum " +
    "INNER JOIN alumno_programa ON alumno_programa.cod_alumno = alumno_alumno_programa.cod_alumno " +
    "LEFT JOIN ubicacion ON ubicacion.id_ubicacion = recaudaciones.id_ubicacion "+
    "LEFT JOIN tipo ON tipo.id_tipo = recaudaciones.id_tipo "+
        where +
    " ORDER BY alumno.codigo DESC, fecha DESC; "

    db.any(query)
        .then(function(data){
            // data.forEach(element => {
            //     element.importe = 'S/.'+numeral(element.importe).format('0,0.00');
            // });
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function(err){
            return next(err);
        })
}
function SelectGeneral(req, res, next, table){
    let query = "Select * from "+table;
    if (table === "concepto")
        query = query +" JOIN clase_pagos ON concepto.id_clase_pagos = clase_pagos.id_clase_pagos "+
        "where clase_pagos.id_clase_pagos = 2";

    db.any(query)
        .then(function(data){
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function(err){
            return next(err);
        })
}
function UpdateObservation(req,res,next,id,message){
    let query = 'UPDATE public.recaudaciones SET'+
        ' observacion_upg='+message+
        ' WHERE id_rec='+id+';';
    console.log(query)
    db.any(query)
        .then(()=>{
            res.status(200)
                .json({
                    status : 'success',
                    message : 'Update success'
                })
        })
        .catch(err=>{
            return next(err);
        })
}
function UpdateQuery(req, res, next, when1, when2, when3, indices) {
    let ind = require('../src/algoritms');
    let query =`UPDATE recaudaciones SET ${ind.i_flag} = CASE ${ind.i_recaudacion} 
        ${when1}, ${ind.i_obs} = CASE ${ind.i_recaudacion} ${when2},
        ${ind.i_ubic} = CASE ${ind.i_recaudacion} ${when3}
         WHERE ${ind.i_recaudacion} IN (${indices})`;
    console.log(query);
    db.any(query)
        .then(function(data){
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function (err) {
            console.log(err);
            return next(err);
        })
}

function InsertQuery(req, res, next, valores){
    let query=`insert into recaudaciones
    (id_alum, id_concepto, id_registro, id_ubicacion, cod_alumno, numero, importe, observacion, fecha, validado, id_tipo)
        values ${valores}`;
    console.log(query);
    db.any(query)
        .then(function(data){
            res.status(200)
                .json({
                    status : 'success',
                    data:data,
                    message : 'Retrieved List'
                });
        })
        .catch(function (err) {
            return next(err);
        })
}

module.exports = {
    SelectGeneral:SelectGeneral,
    SelectCollection:SelectCollection,
    UpdateObservation:UpdateObservation,
    UpdateQuery:UpdateQuery,
    InsertQuery:InsertQuery
};