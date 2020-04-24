const index = async({ Serie }, req, res) => {
    const series = await Serie.find({});
    res.render('series/index', {
        series
    })
}

const novaProcess = async({ Serie }, req, res) => {
    const serie = new Serie(req.body);
    try {
        await serie.save();
        res.redirect('/series');
    } catch (error) {
        res.render('series/nova', {
            erro: Object.keys(error.errors)
        });
    }
};

const novaForm = (req, res) => {
    res.render('series/nova', { erro: [] });
}

const excluir = async({ Serie }, req, res) => {
    await Serie.deleteOne({ _id: req.params.id });
    res.redirect('/series');
}

const editarForm = async({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id });
    res.render('series/editar', {
        serie,
        erro: []
    })
}

const editarProcess = async({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id });
    serie.name = req.body.name;
    serie.status = req.body.status;
    try {
        await serie.save();
        res.redirect('/series');
    } catch (error) {
        res.render('series/editar', {
            serie,
            erro: Object.keys(error.errors)
        });
    }
};

const info = async({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id });
    res.render('series/info', {
        serie,
        erro: []
    })
}

const addComentario = async({ Serie }, req, res) => {
    const serie = await Serie.findOne({ _id: req.params.id });
    serie.coments.push(req.body.comentario);
    try {
        serie.save();
        res.redirect('/series/info/' + req.params.id);
    } catch (error) {
        res.render('series/info', {
            serie,
            erro: []
        })
    }

}

module.exports = {
    index,
    novaProcess,
    novaForm,
    excluir,
    editarForm,
    editarProcess,
    info,
    addComentario
}