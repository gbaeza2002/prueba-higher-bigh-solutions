import { authSigned } from '../src/security.js';
import crypto from 'crypto';

// Mocks minimos
function mockReq(headers = {}) {
    return { header: (key) => headers[key.toLowerCase()] };
}

function mockRes() {
    return {
        code: null,
        body: null,
        status(c) { this.code = c; return this; },
        json(b) { this.body = b; return this; }
    };
}

function next() { next.called = true; }

// Configuración
process.env.SECRET = 'devsecret';
//const secret = process.env.SECRET;

// Helper para firma valida usando
function generateSignature(userId = 'u1', timestamp = Date.now().toString()) {
    const secret = process.env.SECRET || 'devsecret';
    //const secret = process.env.SECRET;

    return crypto.createHmac('sha256', secret)
        .update(userId + timestamp)
        .digest('hex');
}

// Tests esenciales 
test('rechaza sin headers', () => {
    const req = mockReq();
    const res = mockRes();

    authSigned(req, res, next);
    expect(res.code).toBe(401);
});

test('rechaza timestamp invalido', () => {
    const req = mockReq({
        'x-user-id': 'u1',
        'x-timestamp': 'invalid',
        'x-signature': generateSignature('u1', 'invalid')
    });
    const res = mockRes();

    authSigned(req, res, next);
    expect(res.code).toBe(401);
});

test('rechaza firma incorrecta', () => {
    const timestamp = Date.now().toString();
    // Firma con longitud correcta (64) pero contenido inválido
    const invalidSignature = 'a'.repeat(64);

    const req = mockReq({
        'x-user-id': 'u1',
        'x-timestamp': timestamp,
        'x-signature': invalidSignature
    });
    const res = mockRes();

    authSigned(req, res, next);
    expect(res.code).toBe(401);
});

test('acepta con headers válidos', () => {
    const timestamp = Date.now().toString();
    const signature = generateSignature('u1', timestamp);

    const req = mockReq({
        'x-user-id': 'u1',
        'x-timestamp': timestamp,
        'x-signature': signature
    });
    const res = mockRes();

    authSigned(req, res, next);
    expect(next.called).toBe(true);
});


// test('error 500 si falta SECRET', () => {
//     const originalSecret = process.env.SECRET;
//     // Simular falta de SECRET
//     process.env.SECRET = undefined;

//     const timestamp = Date.now().toString();

//     const req = mockReq({
//         'x-user-id': 'u1',
//         'x-timestamp': timestamp,
//         'x-signature': 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890'
//     });
//     const res = mockRes();

//     authSigned(req, res, next);
//     expect(res.code).toBe(500);

//     process.env.SECRET = originalSecret;
// });