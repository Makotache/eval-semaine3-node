import dotenv from "dotenv";

dotenv.config()



export function me(req, res)
{
    res.send(req.session.auth);
}

export function logout(req, res)
{
    req.session.destroy();
    res.status(200);
}

export function login(req, res)
{
    const { password } = req.body;

    if (password == process.env.PASSWORD)
    {
        req.session.auth = true;
        req.session.save(() =>
        {
            res.status(200).send({ status: 200 });
        })
    }
    else
    {
        res.status(401).send({ status: 401 });
    }
}
