export default function (req, res, next)
{
    if (req.session.auth)
    {
        next();
        return;
    }
    res.status(401);
}