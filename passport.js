const localStrategy = require("passport-local").Strategy;
const User = require("./models/User");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username })
        .then((doc)=>{
            if(doc){
                var valid = doc.comparePassword(password,doc.password);
                if(valid){
                    done(null,{
                        username: doc.username,
                        password: doc.password
                    });
                }
            }
            else{
                done(null,false);
            }
        })
        .catch((err) => {
        done(err);
        });
    })
  );
};
