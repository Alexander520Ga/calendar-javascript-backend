//const { createPrivateKey } = require('crypto');
const express = require('express');// importar express import express form 'express'
//const { monitorEventLoopDelay } = require('perf_hooks');
require('dotenv').config()
const cors = require('cors')
//crear el servidor de express
const {dbConection} = require('./database/config')

console.log(process.env)

const app = express(); 

//base de datos
dbConection()

//cors

app.use(cors())

//directorio publico

app.use( express.static('public') ) 

//lectura y parseo del body
app.use(express.json())


//rutas
app.use('/api/auth', require('./routes/auth'));

//rutas eventos
app.use('/api/events', require('./routes/events'));

/* //escuchar peticiones  */ 

app.listen(process.env.PORT, console.log(`corriendo en puerto ${process.env.PORT}`))



/* 
pib nominal(guatemala)   pib per capita(panama)    idh(panama)   territorio(guatemala)    infrastructura(panama)

poblacion(guatemala)     moneda(belice)    crecimiento economico(panama)     seguridad(panama)

turismo(panama)       salario(panama)       poderMilitar(guatemala)      esperanza de vida(panama)  salud(panama)
-----------------------------------------------------------------------------------------------
pib nominal(israel)   pib per capita(israel)    idh(israel)   territorio(egito)    educacion(israel)

poblacion(egipto)     moneda(israel)    crecimiento economico(israel)     seguridad(egitp)

turismo(egitp)       salario(israel)       poderMilitar(egito)      esperanza de vida(israel)


heart   hart
hand    hend
above   abov
place   pleis
case    keis

develop     divelop
decide      disaid
hope        houp
send        send
require     rikuaier

create      crieit
drawn       dron
remain      rimein
carry       keri
swear       swear

wind        wind
told        tould
early       erly
less        less
field       field

suggest sugchest
reach   ritch
wear    wear
manage  menech
forget     forget   

receibe risiv
fall    fol
agree   agri
wonder  wonder
creepy  cripi 

trough  trof
boil    boil
ride    braid
climb   klaim
fetch   fech

plug       plog
style       stail
jug        yog
among       amang
dig         dig

allow   alaou
believe beliv
borrow  barou
break   breik
buy     bai

seize       siz
allocate    alokeit
burst       burst
defeat      difit
double  dabol

increase       inkruis
cover           kaver
catch           katch
arrive          arraiv
refuse          rifius

summon         somon
stem            stem
tour        tur
weaken      wiken
bounce  bauns

flood   flad
grip    grep
regain  rigein
term    term
underline   anderlain

sigh        sai
stir        ster
compose     compous
grin        grin
remark      rimark


*/