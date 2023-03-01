import {Router} from 'express'
const router = new Router()
router.post('/user/login', (req, res) => {
    const {name, userName, password, email} = req.body
    if(!userName || !name || !password || !email) {
        return res.json({msg: 'Some fields are mising and not shoud be empty'})
    }   
    return res.json({
        credentials: {
            name,
            userName,
            email
        }
    })
})
export default router