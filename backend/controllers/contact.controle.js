module.exports = {
    list(request, h) {
        return [
            {
                id: 1,
                name: "Matheus Martins",
                number: "31 9999999",
                descripiton: "Solicitar consultoria em DevOps",
            },
            {
                id: 2,
                name: "Ray Charles",
                number: "11 9999999",
                descripiton: "Orçamento para aulas de inglês",
            },
        ]
    }
}