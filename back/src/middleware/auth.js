export default function (req, res, next)
{
    if (true /*|| req.session.auth*/)
    {
        next()
        return
    }
    res.redirect('/')
}