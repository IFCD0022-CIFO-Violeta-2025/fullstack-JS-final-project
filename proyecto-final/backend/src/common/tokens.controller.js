export default function getToken(length)
{
    const token=(length)=>(Math.random()+Math.random()+Math.random()+Math.random()).substr(0,length);

    return token(length)
}