import { ORDERS, productSummaryLinear, productSummaryQuadratic } from '../src/orders.js';

test('summary linear mantiene total de items', () => {
    const out = productSummaryLinear(ORDERS);
    const totalQty = out.reduce((a, x) => a + x.qty, 0);
    const must = ORDERS.flatMap(o => o.items).reduce((a, x) => a + x.qty, 0);
    expect(totalQty).toBe(must);
});

test('summary linear mantiene total de amount', () => {
    const out = productSummaryLinear(ORDERS);
    const totalAmount = out.reduce((a, x) => a + x.amount, 0);
    const must = ORDERS.flatMap(o => o.items).reduce((a, x) => a + (x.qty * x.price), 0);
    expect(totalAmount).toBe(must);
});

test('summary linear devuelve resultados ordenados por amount descendente', () => {
    const out = productSummaryLinear(ORDERS);
    for (let i = 0; i < out.length - 1; i++) {
        expect(out[i].amount).toBeGreaterThanOrEqual(out[i + 1].amount);
    }
});

test('summary linear coincide con quadratic en valores totales', () => {
    const linear = productSummaryLinear(ORDERS);
    const quadratic = productSummaryQuadratic(ORDERS);

    const linearTotalQty = linear.reduce((a, x) => a + x.qty, 0);
    const quadraticTotalQty = quadratic.reduce((a, x) => a + x.qty, 0);
    expect(linearTotalQty).toBe(quadraticTotalQty);

    const linearTotalAmount = linear.reduce((a, x) => a + x.amount, 0);
    const quadraticTotalAmount = quadratic.reduce((a, x) => a + x.amount, 0);
    expect(linearTotalAmount).toBe(quadraticTotalAmount);
});