import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";
import { randomSuperhero } from 'superheroes';
import generateName from 'sillyname';

const sillyName = generateName();

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your name?",
      name: "name"
    }
  ])
  .then((answers) => {
    answers.heroname = randomSuperhero();
    answers.villainname = sillyName;

    console.log("Hello", answers.name);
    console.log("Your Villain Name will be", answers.villainname);
    console.log("And your Superhero Name will be", answers.heroname);

    var qr_name = qr.image(answers.name, { type: 'png' });
    var qr_villain_name = qr.image(answers.villainname, { type: 'png' });
    var qr_hero_name = qr.image(answers.heroname, { type: 'png' });

    qr_name.pipe(fs.createWriteStream('name.png'));
    qr_villain_name.pipe(fs.createWriteStream('sillyname.png'));    
    qr_hero_name.pipe(fs.createWriteStream('superheroname.png'));

    const fileData = `Name: ${answers.name}
Villain Name: ${answers.villainname}
Superhero Name: ${answers.heroname}`;

    fs.writeFile('myhero.txt', fileData, (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("QR codes are generated \nText file updated");
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Error");
    } else {
      console.error("Something went wrong:", error);
    }
  });