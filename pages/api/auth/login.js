import { wpClient } from '../../../api/client';

export default async function (req, res) {
  const { query, body } = req;
  console.log(req.body);
  await wpClient(`jwt-auth/v1/token`, {
    username: body.userName,
    password: body.password
  })
    .then((response) => {
      console.log(response);
      res.status(200).json('oke');
    })
    .catch((error) => {
      res.status(401).json('email or password not valid');
    });
}
