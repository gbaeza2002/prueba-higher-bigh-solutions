import crypto from "crypto";

// Versión insegura
export function authInsecure(req, res, next) {
    const userId = req.header("x-user-id");
    if (!userId) return res.status(401).json({ error: "missing user" });
    req.user = { id: userId };
    next();
}

// Versión segura 
export function authSigned(req, res, next) {

    const secret = process.env.SECRET || "devsecret";
    //const secret = process.env.SECRET;
    
    if (!secret) return res.status(500).json({ error: "missing secret" });

    const userId = req.header("x-user-id");
    const timestamp = req.header("x-timestamp");
    const signature = req.header("x-signature");

    if (!userId || !timestamp || !signature) {
        return res.status(401).json({ error: "missing headers" });
    }

    // Validar ventana de tiempo (5 min)
    const now = Date.now();
    const diff = Math.abs(now - Number(timestamp));
    if (isNaN(timestamp) || diff > 5 * 60 * 1000) {
        return res.status(401).json({ error: "invalid timestamp" });
    }

    // Generar firma esperada
    const data = userId + timestamp;
    const expectedSig = crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("hex");
    
    //Validar longitud antes de timingSafeEqual
    if (signature.length !== 64) {
        return res.status(401).json({ error: "invalid signature" });
    }

    // Comparación en tiempo constante
    const valid = crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expectedSig, "hex")
    );

    if (!valid) return res.status(401).json({ error: "invalid signature" });

    req.user = { id: userId };
    next()
}