'use strict';

const { Review } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const validReviews = [
  {
    spotId: 1,
    userId: 1,
    review: "Ut quis culpa veniam magna duis ea duis. Veniam nostrud qui quis culpa magna sint. In tempor ipsum mollit magna duis fugiat fugiat sit cupidatat officia incididunt cillum adipisicing consectetur. Anim do occaecat ad esse nisi ullamco. Cillum commodo velit velit adipisicing consequat est amet est sunt labore amet ut.",
    stars: 5
  }, 
  {
    spotId: 1,
    userId: 2,
    review: "Nisi qui ut esse laborum ullamco amet incididunt id pariatur incididunt culpa qui. Laboris ipsum veniam duis exercitation quis esse velit. Esse minim ex irure sint pariatur consequat. Veniam quis qui consectetur id occaecat consequat reprehenderit.",
    stars: 5 
  }, 
  {
    spotId: 1,
    userId: 3,
    review: "Reprehenderit amet ad non qui excepteur Lorem amet nisi quis deserunt duis laborum sit anim. Ullamco ex reprehenderit esse qui ut proident ea laboris non exercitation nisi ut id pariatur. Minim elit irure anim eu non amet fugiat excepteur veniam.",
    stars: 3
  }, 
  {
    spotId: 2,
    userId: 1,
    review: "Ipsum ea reprehenderit enim laborum ullamco ullamco magna sit dolor enim officia proident dolor elit. Non laboris eiusmod ea nostrud magna deserunt laborum proident excepteur magna occaecat do eu. Ex aliqua eiusmod ex aliquip aute. Minim sunt proident nulla excepteur reprehenderit magna.",
    stars: 1
  }, 
  {
    spotId: 2,
    userId: 2,
    review: "Elit quis quis dolore in. Elit adipisicing proident laborum eu cupidatat. Eiusmod proident culpa est eiusmod ut ex.",
    stars: 4
  }, 
  {
    spotId: 2,
    userId: 3,
    review: "Anim irure veniam tempor laboris fugiat Lorem id duis ea occaecat Lorem qui exercitation. Ut velit ipsum dolore commodo deserunt nisi ad commodo. Et velit cupidatat occaecat proident proident exercitation culpa laborum consequat. Adipisicing consectetur sint amet deserunt.",
    stars: 1
  }, 
  {
    spotId: 3,
    userId: 1,
    review: "Ipsum est aute magna in ipsum reprehenderit proident in deserunt. Laborum ad quis veniam consectetur nisi. Dolor nisi sint ex ad tempor reprehenderit non voluptate voluptate proident. Occaecat ullamco minim ut ipsum adipisicing sint nisi ullamco enim ullamco. Aute irure id elit minim est sint pariatur. Minim irure sunt fugiat nostrud irure.",
    stars: 5
  }, 
  {
    spotId: 3,
    userId: 2,
    review: "Magna aute aliquip in cillum. Magna quis occaecat tempor id in sunt nulla fugiat tempor dolor ex dolore reprehenderit. Ad excepteur reprehenderit voluptate excepteur non aliqua consectetur deserunt do id magna. Sit nulla ullamco cillum minim nostrud sint cillum labore incididunt sunt do officia.",
    stars: 5
  }, 
  {
    spotId: 3,
    userId: 3,
    review: "Eu irure sunt adipisicing sit commodo amet. Id eu labore duis officia sit mollit est ipsum cillum proident voluptate. Labore sit tempor pariatur proident occaecat exercitation ex dolore exercitation dolore adipisicing velit.",
    stars: 5
  }, 
  {
    spotId: 4,
    userId: 4,
    review: "Dolor ad esse officia pariatur amet anim nostrud duis dolore elit non occaecat Lorem est. Magna ex et quis laborum magna fugiat. Proident pariatur irure velit minim dolore. Labore non consequat consequat pariatur nulla. Excepteur ea non quis pariatur voluptate et. Mollit eiusmod elit amet in officia ipsum nisi veniam duis. Consectetur cillum pariatur mollit sit fugiat pariatur eiusmod.",
    stars: 3
  }, 
  {
    spotId: 4,
    userId: 5,
    review: "Reprehenderit magna cupidatat ad reprehenderit Lorem sint commodo. Amet et ipsum culpa aliquip commodo ut aliquip ea ad ad. Aliquip aliquip adipisicing aliqua ea dolor voluptate qui dolor deserunt. Aute eu amet ut eu commodo ullamco aliquip adipisicing aliquip. Consectetur commodo laborum ipsum adipisicing ipsum enim nisi nulla ex aliquip. In sint commodo pariatur aute id dolor consequat occaecat sit elit.",
    stars: 4
  }, 
  {
    spotId: 4,
    userId: 6,
    review: "Dolor sit fugiat ex aliqua ut nulla tempor do. Cillum sint et magna enim. Ex incididunt aliqua ad ipsum sint eu commodo tempor et non voluptate voluptate occaecat. Duis cillum tempor incididunt velit eu sunt amet ex. Esse quis proident minim proident ex nostrud adipisicing magna id est deserunt aute. Dolore velit aute voluptate sit deserunt cillum laborum esse mollit ad esse ipsum irure deserunt.",
    stars: 3
  }, 
  {
    spotId: 5,
    userId: 4,
    review: "Magna occaecat cupidatat voluptate ea pariatur exercitation adipisicing cillum. Et reprehenderit ex quis cupidatat proident eiusmod. Irure laborum id culpa commodo. Officia in irure cillum laboris.",
    stars: 1
  }, {
    spotId: 5,
    userId: 5,
    review: "Veniam pariatur in dolore fugiat nulla mollit. Commodo laborum et deserunt voluptate elit ut. Non irure pariatur incididunt aliquip magna est ea ullamco laboris irure. Incididunt ex sit Lorem proident duis enim Lorem dolor Lorem est magna. Nostrud fugiat anim quis culpa exercitation Lorem incididunt consequat ea enim. Nulla nulla velit aute duis nulla excepteur incididunt anim.",
    stars: 3
  }, {
    spotId: 5,
    userId: 6,
    review: "Aliquip culpa sint enim do nulla anim duis cupidatat nulla magna dolore ut irure laboris. Nisi ea in minim ullamco id duis ea officia amet sint deserunt consequat. Proident magna cillum aute excepteur in anim exercitation pariatur. Velit ea ea non ut laboris.",
    stars: 4
  }, {
    spotId: 6,
    userId: 4,
    review: "Proident eu non cupidatat elit qui ullamco nostrud enim amet qui duis eu. Aliquip ad duis ea non id laboris excepteur excepteur in proident proident in. Non cupidatat ullamco ad minim incididunt incididunt commodo commodo cupidatat duis.",
    stars: 4
  }, {
    spotId: 6,
    userId: 5,
    review: "Consectetur esse sit laborum consequat non sit irure ad officia reprehenderit eu voluptate magna culpa. Officia eu magna id consequat. Mollit ea sunt ut excepteur enim sint enim ad ullamco laboris mollit ex.",
    stars: 5
  }, {
    spotId: 6,
    userId: 6,
    review: "Ad dolor magna consectetur culpa dolor cupidatat. Reprehenderit laboris culpa incididunt nulla nisi eiusmod minim. Ipsum excepteur et Lorem eu ex nisi. In est laborum reprehenderit occaecat quis aute commodo ad.",
    stars: 5
  }, {
    spotId: 7,
    userId: 4,
    review: "Labore pariatur adipisicing sit velit. Exercitation excepteur deserunt consequat ea non sint. Excepteur sunt aute mollit ut officia adipisicing. Enim in nulla quis nulla esse ea id. Magna consectetur officia culpa minim est ea commodo esse. Proident voluptate sit esse pariatur ullamco consectetur. Id ad culpa eu sunt aliqua occaecat elit nisi ipsum id.",
    stars: 1
  }, {
    spotId: 7,
    userId: 5,
    review: "Aliquip duis duis elit ut cupidatat magna do incididunt ad sunt incididunt veniam laboris officia. Commodo reprehenderit excepteur deserunt eiusmod eiusmod culpa magna. Ex incididunt irure dolore enim. Anim cupidatat nostrud non non dolor ipsum culpa incididunt nisi et ad. Minim anim do et consectetur ex ipsum elit incididunt incididunt ullamco incididunt pariatur aliquip nostrud. Pariatur minim deserunt eu ex ut nisi. Dolore cupidatat id mollit esse irure consectetur Lorem ad eu velit deserunt ex sit exercitation.",
    stars: 5
  }, {
    spotId: 7,
    userId: 6,
    review: "Excepteur Lorem aliquip aliqua nostrud occaecat ea. Laboris commodo mollit veniam magna eiusmod nisi voluptate sint proident non in ipsum. Enim tempor sit excepteur laboris ad in mollit occaecat nulla proident duis est tempor deserunt. Irure consectetur consequat incididunt aute do. Tempor elit fugiat sunt eu anim ipsum fugiat sint tempor enim qui excepteur. Aliquip aute irure mollit voluptate aliquip labore deserunt ex. Nulla do id ad Lorem nulla tempor adipisicing quis est esse voluptate.",
    stars: 3
  }, {
    spotId: 8,
    userId: 4,
    review: "Culpa id voluptate tempor ex velit sit cillum qui ipsum labore consequat occaecat aliqua ipsum. Ea aute veniam commodo laboris dolore laborum incididunt commodo veniam dolore. Eu anim nulla commodo deserunt enim nisi nulla exercitation Lorem consequat culpa deserunt nostrud. Irure reprehenderit excepteur cupidatat mollit reprehenderit cupidatat consectetur esse labore ullamco et nisi.",
    stars: 1
  }, {
    spotId: 8,
    userId: 5,
    review: "Nostrud eu elit pariatur incididunt aute adipisicing cupidatat laborum elit ea minim. Sint nisi fugiat ad exercitation ut irure occaecat fugiat mollit laboris nostrud quis nulla incididunt. Dolor sit in esse dolore aliquip in cillum labore dolor. Irure id voluptate enim commodo sint sit dolor incididunt duis labore elit incididunt. Nisi id et id proident eiusmod veniam occaecat occaecat deserunt voluptate.",
    stars: 5
  }, {
    spotId: 8,
    userId: 6,
    review: "Non nulla ipsum commodo duis. Sunt officia reprehenderit id mollit do mollit ex sit adipisicing elit occaecat velit aliquip in. Irure elit adipisicing anim cupidatat aliqua aute dolor mollit pariatur amet. Exercitation nulla voluptate irure sint aliqua aliquip consequat pariatur nostrud amet. Reprehenderit amet voluptate magna consectetur mollit esse veniam consequat cupidatat. Quis fugiat sit pariatur aliqua proident quis dolore tempor fugiat aliquip velit.",
    stars: 3
  }, {
    spotId: 9,
    userId: 4,
    review: "Mollit mollit sit incididunt laboris duis mollit consectetur. Deserunt elit velit ad excepteur cillum anim est esse in ullamco elit sit cupidatat. Ipsum ex voluptate irure reprehenderit exercitation ex qui id esse dolore et amet excepteur. Ut magna minim velit officia non dolor Lorem pariatur adipisicing.",
    stars: 2
  }, {
    spotId: 9,
    userId: 5,
    review: "Eu veniam ut culpa velit irure est. Duis dolor irure et mollit ea reprehenderit. Minim laborum veniam et incididunt aliquip consequat ex qui mollit nisi. Ex mollit consequat nisi ad voluptate eiusmod voluptate proident aliquip sit veniam commodo occaecat. Officia cupidatat Lorem duis mollit minim fugiat laborum veniam nisi proident.",
    stars: 4
  }, {
    spotId: 9,
    userId: 6,
    review: "Esse esse sunt duis esse deserunt tempor nostrud cillum. Lorem ullamco qui labore nisi deserunt aute eu est exercitation deserunt ut ipsum esse. Consectetur eu proident cillum esse irure est laboris ex reprehenderit dolore irure qui deserunt. Dolore ad commodo nulla ex elit veniam laborum occaecat aute consectetur ex. Ipsum elit anim id labore et nisi anim veniam dolor. Ullamco sunt amet sit aliquip.",
    stars: 5
  }, {
    spotId: 10,
    userId: 4,
    review: "Id eu qui est ad esse aliqua velit veniam et minim magna sit minim fugiat. Dolore qui id do Lorem occaecat voluptate ad aute proident. Mollit duis est est dolore aute dolor aliquip nulla.",
    stars: 1
  }, {
    spotId: 10,
    userId: 5,
    review: "Est nostrud aute exercitation ad laboris deserunt et commodo veniam do. Amet ea velit sunt dolor in ad id esse veniam laborum consectetur. Pariatur quis sit occaecat consequat irure amet ipsum deserunt et fugiat ea. Labore commodo non minim do ea.",
    stars: 2
  }, {
    spotId: 10,
    userId: 6,
    review: "Duis pariatur proident nisi nulla. Incididunt voluptate velit ea ad dolor irure officia laboris Lorem. Et in laborum id commodo qui dolor sint dolore reprehenderit enim proident excepteur deserunt pariatur. Duis sunt ipsum nisi occaecat pariatur dolor eiusmod laboris culpa velit dolor ut sit. Aliquip sint mollit ipsum nulla sunt sit nulla officia consectetur elit velit incididunt adipisicing ipsum. Magna mollit aliqua veniam fugiat cillum.",
    stars: 2
  }, {
    spotId: 11,
    userId: 4,
    review: "Exercitation veniam dolor consectetur nostrud qui Lorem. Exercitation velit magna aliquip sunt commodo dolore sint ipsum ex aliqua ea. Exercitation id nulla dolore Lorem veniam velit esse aliqua laborum reprehenderit. Culpa nostrud irure eiusmod est non amet dolor magna. Elit anim officia aliqua ex adipisicing esse tempor velit eiusmod mollit nulla consectetur aliqua velit. Cupidatat reprehenderit incididunt aliquip minim velit fugiat adipisicing proident voluptate exercitation elit ad qui duis.",
    stars: 5
  }, {
    spotId: 11,
    userId: 5,
    review: "Proident est consectetur cupidatat Lorem consequat amet anim consequat cillum. Cillum exercitation dolor mollit sit magna nostrud. Nulla sint consectetur laborum velit deserunt do voluptate nisi velit ad laboris. Minim nostrud consectetur velit aliquip occaecat magna duis officia in deserunt est nostrud deserunt. Fugiat id Lorem adipisicing eiusmod qui proident est et quis. Irure veniam nostrud minim deserunt cupidatat velit eiusmod non.",
    stars: 3
  }, {
    spotId: 11,
    userId: 6,
    review: "Magna minim Lorem occaecat adipisicing veniam irure occaecat nulla officia amet ullamco. Aliquip deserunt nisi aliqua pariatur laboris qui elit elit voluptate veniam eu aute. Elit ex nisi eiusmod laborum occaecat mollit laborum laborum cillum.",
    stars: 4
  }, {
    spotId: 12,
    userId: 4,
    review: "Quis esse proident mollit qui. Laborum quis do magna irure id anim labore. Occaecat incididunt fugiat ad magna ut id ipsum culpa sit consectetur sint velit nostrud in.",
    stars: 5
  }, {
    spotId: 12,
    userId: 5,
    review: "Amet officia consequat enim magna tempor enim. Eu cillum aliqua do dolore adipisicing adipisicing. Ea et culpa ex voluptate ipsum mollit aliqua exercitation excepteur pariatur enim dolore culpa. Cupidatat aliquip qui cupidatat sint dolor aliqua id culpa.",
    stars: 3
  }, {
    spotId: 12,
    userId: 6,
    review: "Cillum et ullamco cupidatat sit officia cupidatat amet mollit cillum adipisicing. Sunt amet minim et minim laborum anim. Aute ut aliquip consequat voluptate dolore. Occaecat veniam veniam officia id ex cupidatat minim tempor anim do do esse non. Cupidatat proident amet ea velit non adipisicing.",
    stars: 4
  }, 
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   try {
    await Review.bulkCreate(validReviews, {
      validate: true
    });
   } catch (err) {
    console.log(err);
    throw err;
   }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
