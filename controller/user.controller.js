import User from "../model/User";

export const registration = async (req, res) => {
    try {
      const {  username, email, password } = req.body;
  
      const salt = await bcrypt.genSalt(6);
  
      const hash = await bcrypt.hash(password, salt);
  
      const document = new User({
        username,
        email,
        hashedPassword: hash,
      });
  
      const isEmailExist = await User.findOne({
        email: email,
      });
  
      if (isEmailExist) {
        return res.status(400).json({
          message: "Қолданушы желіде тіркелген",
        });
      }
  
      const user = await document.save();
  
      const { hashedPassword, ...userData } = user._doc;
  
      const token = jwt.sign(
        {
          _id: user._id,
        },
        config.get("jwt_key"),
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        userData,
        token,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  export const login = async (req, res) => {
    try {
        
        const {login, password} = req.body

        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };

          if (validateEmail(login)) {
            user = await User.findOne({
              email: login,
            });
            if (!user) {
              return res.status(404).json({
                message: `'${login}' желіде жоқ`,
              });
            }
          } else {
            user = await User.findOne({
              phone: login,
            });
            if (!user) {
              return res.status(404).json({
                message: `'${login}' желіде жоқ`,
              });
            }
          }

          const isPassValid = await bcrypt.compare(
            password,
            user._doc.hashedPassword
          );
      
          if (!isPassValid) {
            return res.status(400).json({
              message: "Құпия сөз қате терілген",
            });
          }
      
          const token = jwt.sign(
            {
              _id: user._id,
            },
            config.get("jwt_key"),
            {
              expiresIn: "1h",
            }
          );
      
          const { hashedPassword, ...userData } = user._doc;
      
          res.status(200).json({
            ...userData,
            token,
          });

    } catch (error) {
        res.status(500).json(error.message)
    }
  }

  export const me = async (req, res) => {

    try {

      const userId = req.userId;
  
      let user = await User.findById(userId)
  
        const { hashedPassword, ...userData } = user._doc;
  
        res.status(200).json(userData);

    } catch (error) {

      res.status(500).json(error.message);

    }

  };

  export const update = async (req, res) => {
    try {
        const {username, lastname, firstname, patronymic, phone, birthdate} = req.body
        
        const userId = req.userId

        const user = await User.findById(userId)

        await User.updateOne({
            _id: user._id,
        }, {
            username, lastname, firstname, patronymic, phone, birthdate
        })

        res.status(200).json({
            message: 'Қолданушы мәліметі сәтті  жаңарды'
        })

    } catch (error) {
        res.status(500).json(error.message)
    }
  }

  export const all = async (req, res) => {

    try {

        const users = await User.find()

        res.status(200).json(users)

    } catch (error) {

        res.status(500).json(error.message)

    }
    
  }