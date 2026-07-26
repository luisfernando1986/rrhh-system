// ======================================
// API BASE CENTRALIZADA
// ======================================

const API = "/api";

// ======================================
// GET
// ======================================

async function get(url) {
    const res = await fetch(API + url);

    if (!res.ok) {
        throw new Error("Error GET: " + url);
    }

    return res.json();
}

// ======================================
// POST
// ======================================

async function post(url, data) {
    const res = await fetch(API + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Error POST: " + url);
    }

    return res.json();
}

// ======================================
// PUT
// ======================================

async function put(url, data) {
    const res = await fetch(API + url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Error PUT: " + url);
    }

    return res.json();
}

// ======================================
// DELETE
// ======================================

async function del(url) {
    const res = await fetch(API + url, {
        method: "DELETE"
    });

    if (!res.ok) {
        throw new Error("Error DELETE: " + url);
    }

    return res.json();
}