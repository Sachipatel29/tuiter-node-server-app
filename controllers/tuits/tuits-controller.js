import * as tuitsDao from './tuits-dao.js'


const createTuit = async(req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.time = "1h";
    newTuit.replies = 0;
    newTuit.retuits = 0;
    newTuit.disliked = false;
    newTuit.dislikes = 0;
    newTuit.handle = "@nasa";
    newTuit.userName = "Nasa"
    newTuit.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png"
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(newTuit);

}



const findTuits  = async(req, res) => {
    console.log("reached\n")
    const tuits = await tuitsDao.findTuits()
    console.log(tuits);
    res.json(tuits);
}


const updateTuit = async(req, res) => {
    const tuitdId = req.params.tid;
    const updates = req.body;
    console.log(typeof(tuitdId), req.body);
    const status = await tuitsDao
                       .updateTuit(tuitdId, updates);
    res.json(status);  
}

const deleteTuit = async(req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
    res.sendStatus(200);
}


export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}

