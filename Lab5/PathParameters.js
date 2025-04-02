export default function PathParameters(app) {
    app.get("/lab5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });
    app.get("/lab5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
    });

    app.get("/lab5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        res.send((parseInt(a) * parseInt(b)).toString());
    });


    app.get("/lab5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const numB = parseInt(b);
        if (numB === 0) {
            res.send("Cannot divide by zero");
        } else {
            res.send((parseInt(a) / numB).toString());
        }
    });
};
