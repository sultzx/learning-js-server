import User from "../model/User.js";
import Rating from '../model/Rating.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
import Score from "../model/Score.js";
import { lessons } from "../lessons.js";

export const registration = async (req, res) => {
  try {

    const { username, email, password } = req.body;

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

    const rating = new Rating({
      user: user._id
    })

    await rating.save()

    lessons.forEach(async (lesson, i) => {

      const document = new Score({
        lesson: lesson.color,
        user: rating.user._id
      })
      await document.save()

    })




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

export const pushScores = async (req, res) => {
  try {

    const userId = req.userId

    const scores = await Score.find({}).populate('user').exec()

    const rating = await Rating.findOne({
      user: userId
    })

    scores.forEach((score, i) => {
      if (score.user._id == userId) {
        console.log('score.user._id', score.user._id, 'user._id', userId)
        rating.scores.push(score._id)
      }
    })

    await rating.save()

    res.status(200).json({
      success: true
    })


  } catch (error) {
    res.status(500).json(error.message);
  }
}



export const login = async (req, res) => {
  try {

    const { login, password } = req.body

    let user = ''

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
    const { username, fullname, phone } = req.body

    const userId = req.userId

    const user = await User.findById(userId)

    await User.updateOne({
      _id: user._id,
    }, {
      username, fullname, phone
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

export const setScore = async (req, res) => {
  try {

    const { chapter, lesson, score } = req.body

    const userId = req.userId

    console.log(chapter, lesson, score)

    const currentScores = await Score.find({
      user: userId
    })

    currentScores.forEach(async (currentScore, i) => {
      if (currentScore.lesson == chapter) {

        switch (lesson) {
          case 1:
            currentScore.first = score
            break;
          case 2:
            currentScore.second = score
            break;
          case 3:
            currentScore.third = score
            break;
          case 4:
            currentScore.fourth = score
            break;
          case 5:
            currentScore.fifth = score
            break
        }
        console.log(currentScore)

        await currentScore.save()
      }



    })





    res.status(200).json({
      message: 'Жауап сәтті қабылданды'
    })

  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getScore = async (req, res) => {
  try {

    const userId = req.userId

    const rating = await Rating.findOne({
      user: userId
    })

    res.status(200).json(rating)

  } catch (error) {
    res.status(500).json(error.message)
  }
}


