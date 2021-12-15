// module.exports = function (app) {
//     var User = app.models.User;
//     var Role = app.models.Role;
//     var RoleMapping = app.models.RoleMapping;
//     var Team = app.models.Team;

//     User.create([
//         { username: 'Raphael', realm: 'Raphael Ramos', email: 'rapha444@gmail.com', password: 'PassWord' },
//         { username: 'Admin', realm: 'Admin', email: 'rafacker@live.com', password: 'PassWord' },
//         { username: 'Teste', realm: 'Teste', email: 'teste@teste.com', password: 'PassWord' }
//     ], function (err, users) {
//         if (err) throw err;

//         console.log('Created users:', users);

//         //create the admin role
//         Role.create({
//             name: 'admin'
//         }, function (err, role) {
//             if (err) throw err;

//             console.log('Created role:', role);

//             //make admin
//             role.principals.create({
//                 principalType: RoleMapping.USER,
//                 principalId: users[1].id
//             }, function (err, principal) {
//                 if (err) throw err;

//                 console.log('Created principal:', principal);
//             });
//         });

//         Role.create({
//             name: 'restaurant'
//         }, function (err, role) {
//             if (err) throw err;

//             console.log('Created role:', role);

//             //make restaurant
//             role.principals.create({
//                 principalType: RoleMapping.USER,
//                 principalId: users[0].id
//             }, function (err, principal) {
//                 if (err) throw err;

//                 console.log('Created principal:', principal);
//             });
//         });
//     });
// };