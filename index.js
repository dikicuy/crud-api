// <<========== FINAL TASK ===============>>

const fastify = require('fastify')({
    logger: true
})
const db = require('./db');

// <<=================== READ ========================>>

// =====> ini pake params

fastify.get('/buku/:search', async (request, reply) => {
    const buku = await db.query(`select id, sku, judul from buku where sku like $1`, [
        `%${request.params.search}%`
    ]);
    return buku;
})

// ------ PENJELASAN : klo di params, :search itu route, muncul di function bawah, yg request.params

// =====> ini pake querystring

fastify.get('/buku', async (request, reply) => {
    const buku = await db.query(`select id, sku, judul from buku where sku like $1`, [
        `%${request.query.search}%`
    ]);
    return buku;
})

// ====> buat cari yg detail

fastify.get('/buku/:idBuku', async (request, reply) => {
    const buku = await db.query(`select * from buku where id = $1`,
        [`${request.query.search}`]
    );
    return buku;
})

// ----> PENJELASAN : klo querystring, di vs code nya cuman /buku (kosongan aja) tapi search di postman
//                     itu pake ? sama =, contoh http://localhost:3000/buku?caricok=3

// =====> ini pake payload, cuman bisa di post & put

fastify.post('/buku', async (request, reply) => {
    const buku = await db.query(`select id, sku, judul from buku where sku like $1`, [
        `%${request.body.search}%`
    ]);
    return buku;
})

// fastify.put('/dewinta', async (request, reply) => {
//     return 'dewinta programmer maestro'
// })

// <<===================== DELETE =========================>>

// ===> ini syntax buat delete pake params

fastify.delete('/buku/:search', async (request, reply) => {
    const buku = await db.query(`delete from buku where id = $1`, [
        request.params.search
    ]);
    return ('berhasil dihapus ' + request.params.search);
})

// klo mau pake $ harus berbentuk string, buat gabungin string pake $ atau +

// fastify.delete('/buku', async (request, reply) => {
//     return 'delete method'
// })

// <<====================== UPDATE =======================>>

// update pake put

fastify.put('/buku/:idBuku', async (request, reply) => {
    const newUser = request.body;
    const buku = await db.query(`update buku set judul = '${newUser.judul}' where id = $1`, [
        request.params.idBuku
    ]);
    return ('berhasil diupdate ' + request.params.idBuku);
})


// <<======================== INSERT ======================>

fastify.post('/buku', async (request, reply) => {
    const newUser = request.body;
    const buku = await db.query(`insert into buku (sku,judul,harga,stock) 
    values ('${newUser.sku}','${newUser.judul}','${newUser.harga}','${newUser.stock}');`)
    return ('berhasil ditambahkan ');
})

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()

