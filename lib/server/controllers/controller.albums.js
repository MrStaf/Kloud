// Libraries
const mongoose = require("mongoose");

// Models
const Albums = require("../models/models.album");
const Photo = require("../models/models.photo");

const addAlbum = async (req, res) => {
  try {
    const userId = req.user._id;
    const name = req.body.name?.trim();
    const date = new Date().toString();
    const charlist = new RegExp(
      !/^[A-Za-zᴀⱯɐᵄⱭɑᵅꬰꭤⱰɒᶛʙᴃᴯꞖꞗꞴꞵᴄↃↄꞳꭓꭕꭔÐðᶞꟇꟈꝹꝺᴅᴆꝱẟᴇꬲꬳꬴƎᴲǝⱻƏəₔᵊƐɛᵋEɘꞫɜᶟɞʚᴈᵌɤꝻꝼꜰℲⅎꟻꬵꝽᵹꞬɡᶢꬶɢᵷ⅁ꝾꝿƔɣˠƢƣʜǶƕⱵⱶꟵꟶꜦꜧꭜıꞮɪᶦꟾꟷᴉᵎᵻᶧƖɩᶥᴊKᴋꞰʞʟᶫꝆꝇᴌꬸꬹꬷꭝꝲꞀꞁ⅃ᴍꬺꟽꟿꝳɴᶰᴎᴻꬻꝴŊŋᵑꬼᴏᴑꬽꬾƆɔᵓᴐꬿᴒᴖᵔᴗᵕꞶꞷɷȢȣᴕᴽᴘꟼɸᶲⱷĸꞯꞂꞃƦʀꝚꝛᴙꭆɹʴᴚʁʶꭉꭇꭈꭊꭋꭌꭅꝵꝶꝜꝝſꟉꟊꞄꞅƧƨꜱƩʃᶴꭍƪʅꞆꞇᴛꝷꞱʇᴜᶸᴝᵙᴞꭒꭟꭎꭏꞍɥᶣƜɯꟺᵚᴟƱʊᶷᴠỼỽɅʌᶺᴡꟂꟃʍꭩꭖꭗꭘꭙꭙ̆ʏꭚʎ⅄ƍᴢꝢꝣƷʒᶾᴣƸƹȜȝÞþǷƿꝨꝩꝪꝫꝬꝭꝮꝯꝰꝸꜪꜫꜬꜭꜮꜯƼƽƄƅɁɂʔꜢꜣꞋꞌꞏʕˤᴤᴥᵜꜤꜥʖǀǁǃǂʗʘʬʭꞚꞛꞜꞝꞞꞟẚÀàÁáÂâẦầẤấẪẫẨẩÃãÃ̀ã̀Ã́ã́Ã̂ã̂Ã̌ã̌Ã̍ã̍Ã̎ã̎ĀāĀ̀ā̀Ā́ā́Ā̂ā̂Ā̃ā̃Ā̃́ā̃́Ā̄ā̄Ā̆ā̆Ā̆́ā̆́Ā̈ā̈Ā̊ā̊Ā̌ā̌ĂăẰằẮắẴẵẲẳȦȧȦ́ȧ́ǠǡÄäÄ́ä́Ä̀ä̀Ä̂ä̂Ä̃ä̃ǞǟǞ̆ǟ̆Ä̆ä̆Ä̌ä̌ẢảÅåÅǺǻÅ̂å̂Å̃å̃Å̄å̄Å̄̆å̄̆Å̆å̆A̋a̋ǍǎA̍a̍A̎a̎ȀȁȂȃA̐a̐A̓a̓A̧a̧À̧à̧Á̧á̧Â̧â̧Ǎ̧ǎ̧A̭a̭A̰a̰À̰à̰Á̰á̰Ā̰ā̰Ä̰ä̰Ä̰́ä̰́ĄąĄ̀ą̀Ą́ą́Ą̂ą̂Ą̃ą̃Ą̄ą̄Ą̄̀ą̄̀Ą̄́ą̄́Ą̄̂ą̄̂Ą̄̌ą̄̌Ą̇ą̇Ą̈ą̈Ą̈̀ą̈̀Ą̈́ą̈́Ą̈̂ą̈̂Ą̈̌ą̈̌Ą̈̄ą̈̄Ą̊ą̊Ą̌ą̌Ą̋ą̋Ą̱ą̱Ą̱̀ą̱̀Ą̱́ą̱́A᷎a᷎A̱a̱À̱à̱Á̱á̱Â̱â̱Ã̱ã̱Ā̱ā̱Ā̱̀ā̱̀Ā̱́ā̱́Ā̱̂ā̱̂Ä̱ä̱Ä̱̀ä̱̀Ä̱́ä̱́Ä̱̂ä̱̂Ä̱̌ä̱̌Å̱å̱Ǎ̱ǎ̱A̱̥a̱̥ẠạẠ́ạ́Ạ̀ạ̀ẬậẠ̃ạ̃Ạ̄ạ̄ẶặẠ̈ạ̈Ạ̈̀ạ̈̀Ạ̈́ạ̈́Ạ̈̂ạ̈̂Ạ̈̌ạ̈̌Ạ̌ạ̌Ạ̍ạ̍A̤a̤À̤à̤Á̤á̤Â̤â̤Ä̤ä̤ḀḁḀ̂ḁ̂Ḁ̈ḁ̈A̯a̯A̩a̩À̩à̩Á̩á̩Â̩â̩Ã̩ã̩Ā̩ā̩Ǎ̩ǎ̩A̩̍a̩̍A̩̓a̩̓A͔a͔Ā͔ā͔ȺⱥȺ̀ⱥ̀Ⱥ́ⱥ́ᶏꞺꞻⱭ̀ɑ̀Ɑ́ɑ́Ɑ̂ɑ̂Ɑ̃ɑ̃Ɑ̄ɑ̄Ɑ̆ɑ̆Ɑ̇ɑ̇Ɑ̈ɑ̈Ɑ̊ɑ̊Ɑ̌ɑ̌ᶐB̀b̀B́b́B̂b̂B̃b̃B̄b̄ḂḃB̈b̈B̒b̒B̕b̕ḆḇḆ̂ḇ̂ḄḅB̤b̤B̥b̥B̬b̬ɃƀᵬᶀƁɓƂƃʙ̇ʙ̣C̀c̀ĆćĈĉC̃c̃C̄c̄C̄́c̄́C̆c̆ĊċC̈c̈ČčČ́č́Č͑č͑Č̓č̓Č̕č̕Č̔č̔C̋c̋C̓c̓C̕c̕C̔c̔C͑c͑ÇçḈḉÇ̆ç̆Ç̇ç̇Ç̌ç̌ꞔꟄC̦c̦C̭c̭C̱c̱C̮c̮C̣c̣Ć̣ć̣Č̣č̣C̥c̥C̬c̬C̯c̯C̨c̨ȻȼȻ̓ȼ̓ꞒꞓƇƈɕᶝꜾꜿD́d́D̂d̂D̃d̃D̄d̄ḊḋD̊d̊ĎďD̑d̑D̓d̓D̕d̕ḐḑD̦d̦ḒḓḎḏD̮d̮ḌḍḌ́ḍ́Ḍ̄ḍ̄D̤d̤D̥d̥D̬d̬D̪d̪ĐđĐ̣đ̣Đ̱đ̱ᵭᶁƉɖƊɗᶑƋƌȡꝹ́ꝺ́Ꝺ̇ꝺ̇ᴅ̇ᴅ̣Ð́ð́Ð̣ð̣ÈèÉéÊêỀềẾếỄễÊ̄ê̄Ê̆ê̆Ê̌ê̌ỂểẼẽẼ̀ẽ̀Ẽ́ẽ́Ẽ̂ẽ̂Ẽ̌ẽ̌Ẽ̍ẽ̍Ẽ̎ẽ̎ĒēḔḕḖḗĒ̂ē̂Ē̃ē̃Ē̃́ē̃́Ē̄ē̄Ē̆ē̆Ē̆́ē̆́Ē̌ē̌Ē̑ē̑ĔĕĔ̀ĕ̀Ĕ́ĕ́Ĕ̄ĕ̄ĖėĖ́ė́Ė̃ė̃Ė̄ė̄ËëË̀ë̀Ë́ë́Ë̂ë̂Ë̃ë̃Ë̄ë̄Ë̌ë̌ẺẻE̊e̊E̊̄e̊̄E̋e̋ĚěĚ́ě́Ě̃ě̃Ě̋ě̋Ě̑ě̑E̍e̍E̎e̎ȄȅȆȇE̓e̓E᷎e᷎ȨȩȨ̀ȩ̀Ȩ́ȩ́Ȩ̂ȩ̂ḜḝȨ̌ȩ̌Ẽ̦ẽ̦ĘęĘ̀ę̀Ę́ę́Ę̂ę̂Ę̃ę̃Ę̃́ę̃́Ę̄ę̄Ę̄̀ę̄̀Ę̄́ę̄́Ę̄̂ę̄̂Ę̄̃ę̄̃Ę̄̌ę̄̌Ę̆ę̆Ę̇ę̇Ę̇́ę̇́Ę̈ę̈Ę̈̀ę̈̀Ę̈́ę̈́Ę̈̂ę̈̂Ę̈̌ę̈̌Ę̈̄ę̈̄Ę̋ę̋Ę̌ę̌Ę̑ę̑Ę̱ę̱Ę̱̀ę̱̀Ę̱́ę̱́Ę̣ę̣Ę᷎ę᷎ḘḙḚḛE̱e̱È̱è̱É̱é̱Ê̱ê̱Ẽ̱ẽ̱Ē̱ē̱Ḕ̱ḕ̱Ḗ̱ḗ̱Ē̱̂ē̱̂Ë̱ë̱Ë̱̀ë̱̀Ë̱́ë̱́Ë̱̂ë̱̂Ë̱̌ë̱̌Ě̱ě̱E̮e̮Ē̮ē̮ẸẹẸ̀ẹ̀Ẹ́ẹ́ỆệẸ̃ẹ̃Ẹ̄ẹ̄Ẹ̄̀ẹ̄̀Ẹ̄́ẹ̄́Ẹ̄̃ẹ̄̃Ẹ̆ẹ̆Ẹ̆̀ẹ̆̀Ẹ̆́ẹ̆́Ẹ̈ẹ̈Ẹ̈̀ẹ̈̀Ẹ̈́ẹ̈́Ẹ̈̂ẹ̈̂Ẹ̈̌ẹ̈̌Ẹ̍ẹ̍Ẹ̌ẹ̌Ẹ̑ẹ̑E̤e̤È̤è̤É̤é̤Ê̤ê̤Ë̤ë̤E̥e̥E̯e̯E̩e̩È̩è̩É̩é̩Ê̩ê̩Ẽ̩ẽ̩Ē̩ē̩Ě̩ě̩E̩̍e̩̍E̩̓e̩̓È͕è͕Ê͕ê͕Ẽ͕ẽ͕Ē͕ē͕Ḕ͕ḕ͕E̜e̜E̹e̹È̹è̹É̹é̹Ê̹ê̹Ẽ̹ẽ̹Ē̹ē̹Ḕ̹ḕ̹ɆɇᶒⱸᶕᶓɚᶔɝƐ̀ɛ̀Ɛ́ɛ́Ɛ̂ɛ̂Ɛ̃ɛ̃Ɛ̃̀ɛ̃̀Ɛ̃́ɛ̃́Ɛ̃̂ɛ̃̂Ɛ̃̌ɛ̃̌Ɛ̃̍ɛ̃̍Ɛ̃̎ɛ̃̎Ɛ̄ɛ̄Ɛ̆ɛ̆Ɛ̇ɛ̇Ɛ̈ɛ̈Ɛ̈̀ɛ̈̀Ɛ̈́ɛ̈́Ɛ̈̂ɛ̈̂Ɛ̈̌ɛ̈̌Ɛ̌ɛ̌Ɛ̍ɛ̍Ɛ̎ɛ̎Ɛ̣ɛ̣Ɛ̣̀ɛ̣̀Ɛ̣́ɛ̣́Ɛ̣̂ɛ̣̂Ɛ̣̃ɛ̣̃Ɛ̣̈ɛ̣̈Ɛ̣̈̀ɛ̣̈̀Ɛ̣̈́ɛ̣̈́Ɛ̣̈̂ɛ̣̈̂Ɛ̣̈̌ɛ̣̈̌Ɛ̣̌ɛ̣̌Ɛ̤ɛ̤Ɛ̤̀ɛ̤̀Ɛ̤́ɛ̤́Ɛ̤̂ɛ̤̂Ɛ̤̈ɛ̤̈Ɛ̧ɛ̧Ɛ̧̀ɛ̧̀Ɛ̧́ɛ̧́Ɛ̧̂ɛ̧̂Ɛ̧̌ɛ̧̌Ɛ̨ɛ̨Ɛ̨̀ɛ̨̀Ɛ̨́ɛ̨́Ɛ̨̂ɛ̨̂Ɛ̨̄ɛ̨̄Ɛ̨̆ɛ̨̆Ɛ̨̈ɛ̨̈Ɛ̨̌ɛ̨̌Ɛ̰ɛ̰Ɛ̰̀ɛ̰̀Ɛ̰́ɛ̰́Ɛ̰̄ɛ̰̄Ɛ̱ɛ̱Ɛ̱̀ɛ̱̀Ɛ̱́ɛ̱́Ɛ̱̂ɛ̱̂Ɛ̱̃ɛ̱̃Ɛ̱̈ɛ̱̈Ɛ̱̈̀ɛ̱̈̀Ɛ̱̈́ɛ̱̈́Ɛ̱̌ɛ̱̌Ə̀ə̀Ə́ə́Ə̂ə̂Ə̄ə̄Ə̌ə̌Ə̏ə̏F̀f̀F́f́F̃f̃F̄f̄ḞḟF̓f̓F̧f̧ᵮᶂƑƒꞘꞙF̱f̱F̣f̣ꜰ̇Ꝼ́ꝼ́Ꝼ̇ꝼ̇Ꝼ̣ꝼ̣G̀g̀ǴǵǴ̄ǵ̄ĜĝG̃g̃G̃́g̃́ḠḡḠ́ḡ́ĞğĠġG̈g̈G̈̇g̈̇G̊g̊G̋g̋ǦǧǦ̈ǧ̈G̑g̑G̒g̒G̓g̓G̕g̕G̔g̔ĢģG̦g̦G̱g̱G̱̓g̱̓G̮g̮G̣g̣G̤g̤G̥g̥G̫g̫ꞠꞡǤǥᶃƓɠɢ̇ɢ̣ʛƔ̓ɣ̓H̀h̀H́h́ĤĥH̄h̄ḢḣḦḧȞȟH̐h̐H̓h̓H̕h̕ḨḩH̨h̨H̭h̭H̱ẖḪḫḤḥḤ̣ḥ̣H̤h̤H̥h̥H̬h̬H̯h̯ĦħꟸĦ̥ħ̥ꞪɦʱⱧⱨꞕh̢ʜ̇ɧÌìÍíÎîÎ́î́ĨĩĨ́ĩ́Ĩ̀ĩ̀Ĩ̂ĩ̂Ĩ̌ĩ̌Ĩ̍ĩ̍Ĩ̎ĩ̎ĪīĪ́ī́Ī̀ī̀Ī̂ī̂Ī̌ī̌Ī̃ī̃Ī̄ī̄Ī̆ī̆Ī̆́ī̆́ĬĭĬ̀ĭ̀Ĭ́ĭ́İiIıİ́i̇́ÏïÏ̀ï̀ḮḯÏ̂ï̂Ï̃ï̃Ï̄ï̄Ï̌ï̌Ï̑ï̑I̊i̊I̋i̋ǏǐỈỉI̍i̍I̎i̎ȈȉI̐i̐ȊȋI᷎i᷎ĮįĮ̀į̀Į́į́į̇́Į̂į̂Į̃į̃į̇̃Į̄į̄Į̄̀į̄̀Į̄́į̄́Į̄̂į̄̂Į̄̆į̄̆Į̄̌į̄̌Į̈į̈Į̈̀į̈̀Į̈́į̈́Į̈̂į̈̂Į̈̌į̈̌Į̈̄į̈̄Į̋į̋Į̌į̌Į̱į̱Į̱́į̱́Į̱̀į̱̀I̓i̓I̧i̧Í̧í̧Ì̧ì̧Î̧î̧I̭i̭Ī̭ī̭ḬḭḬ̀ḭ̀Ḭ́ḭ́Ḭ̄ḭ̄Ḭ̈ḭ̈Ḭ̈́ḭ̈́I̱i̱Ì̱ì̱Í̱í̱Î̱î̱Ǐ̱ǐ̱Ĩ̱ĩ̱Ï̱ï̱Ḯ̱ḯ̱Ï̱̀ï̱̀Ï̱̂ï̱̂Ï̱̌ï̱̌Ī̱ī̱Ī̱́ī̱́Ī̱̀ī̱̀Ī̱̂ī̱̂I̮i̮ỊịỊ̀ị̀Ị́ị́Ị̂ị̂Ị̃ị̃Ị̄ị̄Ị̈ị̈Ị̈̀ị̈̀Ị̈́ị̈́Ị̈̂ị̈̂Ị̈̌ị̈̌Ị̌ị̌Ị̍ị̍I̤i̤Ì̤ì̤Í̤í̤Î̤î̤Ï̤ï̤I̥i̥Í̥í̥Ï̥ï̥I̯i̯Í̯í̯Ĩ̯ĩ̯I̩i̩I͔i͔Ī͔ī͔ƗɨᶤƗ̀ɨ̀Ɨ́ɨ́Ɨ̂ɨ̂Ɨ̌ɨ̌Ɨ̃ɨ̃Ɨ̄ɨ̄Ɨ̈ɨ̈Ɨ̧ɨ̧Ɨ̧̀ɨ̧̀Ɨ̧̂ɨ̧̂Ɨ̧̌ɨ̧̌Ɨ̱ɨ̱Ɨ̱̀ɨ̱̀Ɨ̱́ɨ̱́Ɨ̱̂ɨ̱̂Ɨ̱̈ɨ̱̈Ɨ̱̌ɨ̱̌Ɨ̯ɨ̯ᶖꞼꞽı̣ı̥Ɩ̀ɩ̀Ɩ́ɩ́Ɩ̂ɩ̂Ɩ̃ɩ̃Ɩ̈ɩ̈Ɩ̌ɩ̌ᵼJ́j́ĴĵJ̃j̃j̇̃J̄j̄J̇J̈j̈J̈̇j̈̇J̊j̊J̋j̋J̌ǰJ̌́ǰ́J̑j̑J̓j̓J᷎j᷎J̱j̱J̣j̣J̣̌ǰ̣J̥j̥ɈɉɈ̱ɉ̱ꞲʝᶨȷɟᶡʄK̀k̀ḰḱK̂k̂K̃k̃K̄k̄K̆k̆K̇k̇K̈k̈ǨǩK̑k̑K̓k̓K̕k̕K̔k̔K͑k͑ĶķK̦k̦K̨k̨ḴḵḴ̓ḵ̓ḲḳK̮k̮K̥k̥K̬k̬K̫k̫ᶄƘƙⱩⱪꝀꝁꝂꝃꝄꝅꞢꞣᴋ̇ĿŀL̀l̀ĹĺL̂l̂L̃l̃L̄l̄L̇l̇L̈l̈L̋l̋ĽľL̐l̐L̑l̑L̓l̓L̕l̕ĻļĻ̂ļ̂Ļ̃ļ̃L̦l̦ḼḽḺḻḺ̓ḻ̓L̮l̮ḶḷḶ̀ḷ̀Ḷ́ḷ́ḸḹḸ́ḹ́Ḹ̆ḹ̆Ḷ̓ḷ̓Ḷ̕ḷ̕Ḷ̣ḷ̣L̤l̤L̤̄l̤̄L̥l̥L̥̀l̥̀Ĺ̥ĺ̥L̥̄l̥̄L̥̄́l̥̄́L̥̄̆l̥̄̆L̥̕l̥̕L̩l̩L̩̀l̩̀L̩̓l̩̓L̯l̯ŁłŁ̇ł̇Ł̓ł̓Ł̣ł̣Ł̱ł̱ꝈꝉȽƚⱠⱡⱢɫꭞꞭɬᶅᶪɭᶩꞎȴʟ̇ʟ̣ƛƛ̓λ̴λ̴̓M̀m̀ḾḿM̂m̂M̃m̃M̄m̄M̆m̆ṀṁṀ̇ṁ̇M̈m̈M̋m̋M̍m̍M̌m̌M̐m̐M̑m̑M̓m̓M̕̕m̕M͑m͑ᵯM̧m̧M̨m̨M̦m̦M̱m̱Ḿ̱ḿ̱M̮m̮ṂṃṂ́ṃ́Ṃ̄ṃ̄Ṃ̓ṃ̓M̥m̥Ḿ̥ḿ̥M̥̄m̥̄M̥̄́m̥̄́M̥̄̆m̥̄̆M̬m̬M̩m̩M̩̀m̩̀M̩̓m̩̓M̯m̯ᶆm̢Ɱɱᶬᴍ̇ᴍ̣ǸǹŃńN̂n̂ÑñÑ̈ñ̈N̄n̄N̆n̆ṄṅṄ̇ṅ̇N̈n̈N̋n̋ŇňN̐n̐N̑n̑N̍n̍N̓n̓N̕n̕ꞤꞥᵰŅņŅ̂ņ̂Ņ̃ņ̃N̦n̦N̨n̨ṊṋN̰n̰ṈṉṈ́ṉ́N̮n̮ṆṇṆ́ṇ́Ṇ̄ṇ̄Ṇ̄́ṇ̄́Ṇ̓ṇ̓N̤n̤N̥n̥Ǹ̥ǹ̥Ń̥ń̥Ñ̥ñ̥Ñ̥́ñ̥́N̥̄n̥̄N̥̄́n̥̄́N̥̄̆n̥̄̆N̥̄̑n̥̄̑Ṅ̥ṅ̥N̥̑n̥̑N̥̑́n̥̑́N̥̑̄n̥̑̄N̯n̯N̩n̩Ǹ̩ǹ̩N̩̓n̩̓N̲n̲ƝɲᶮȠƞꞐꞑŊ̀ŋ̀Ŋ́ŋ́Ŋ̂ŋ̂Ŋ̄ŋ̄Ŋ̈ŋ̈Ŋ̈̇ŋ̈̇Ŋ̊ŋ̊Ŋ̑ŋ̑Ŋ̨ŋ̨Ŋ̣ŋ̣Ŋ̥ŋ̥Ŋ̥́ŋ̥́Ŋ̥̄ŋ̥̄Ŋ̥̄́ŋ̥̄́ᶇɳᶯȵɴ̇ɴ̣ÒòÓóÔôỐốỒồỖỗÔ̆ô̆ỔổÕõÕ̍õ̍Õ̎õ̎Õ̀õ̀ṌṍÕ̂õ̂Õ̌õ̌ṎṏȬȭŌōṒṓṐṑŌ̂ō̂Ō̃ō̃Ō̃́ō̃́Ō̄ō̄Ō̆ō̆Ō̆́ō̆́Ō̈ō̈Ō̌ō̌ŎŏŎ̀ŏ̀Ŏ́ŏ́Ŏ̈ŏ̈ȮȯȮ́ȯ́ȰȱO͘o͘Ó͘ó͘Ò͘ò͘Ō͘ō͘O̍͘o̍͘ÖöÖ́ö́Ö̀ö̀Ö̂ö̂Ö̌ö̌Ö̃ö̃ȪȫȪ̆ȫ̆Ö̆ö̆ỎỏO̊o̊ŐőǑǒO̍o̍O̎o̎ȌȍO̐o̐ȎȏO̓o̓ØøØ̀ø̀ǾǿØ̂ø̂Ø̃ø̃Ø̄ø̄Ø̄́ø̄́Ø̄̆ø̄̆Ø̆ø̆Ø̇ø̇Ø̇́ø̇́Ø̈ø̈Ø̋ø̋Ø̌ø̌Ø᷎ø᷎Ø̨ø̨Ǿ̨ǿ̨Ø̨̄ø̨̄Ø̣ø̣Ø̥ø̥Ø̰ø̰Ǿ̰ǿ̰Ø¸ø¸Ǿ¸ǿ¸ƟɵᶱƠơỚớỜờỠỡƠ̆ơ̆ỞởO᷎o᷎Ó᷎ó᷎O̧o̧Ó̧ó̧Ò̧ò̧Ô̧ô̧Ǒ̧ǒ̧ǪǫǪ̀ǫ̀Ǫ́ǫ́Ǫ̂ǫ̂Ǫ̃ǫ̃ǬǭǬ̀ǭ̀Ǭ́ǭ́Ǭ̂ǭ̂Ǭ̃ǭ̃Ǭ̆ǭ̆Ǭ̌ǭ̌Ǫ̆ǫ̆Ǫ̆́ǫ̆́Ǫ̇ǫ̇Ǫ̇́ǫ̇́Ǫ̈ǫ̈Ǫ̈̀ǫ̈̀Ǫ̈́ǫ̈́Ǫ̈̂ǫ̈̂Ǫ̈̃ǫ̈̃Ǫ̈̄ǫ̈̄Ǫ̈̌ǫ̈̌Ǫ̋ǫ̋Ǫ̌ǫ̌Ǫ̑ǫ̑Ǫ̣ǫ̣Ǫ̱ǫ̱Ǫ̱́ǫ̱́Ǫ̱̀ǫ̱̀Ǫ᷎ǫ᷎O̭o̭O̰o̰Ó̰ó̰O̱o̱Ò̱ò̱Ó̱ó̱Ô̱ô̱Ǒ̱ǒ̱Õ̱õ̱Ō̱ō̱Ṓ̱ṓ̱Ṑ̱ṑ̱Ō̱̂ō̱̂Ö̱ö̱Ö̱́ö̱́Ö̱̀ö̱̀Ö̱̂ö̱̂Ö̱̌ö̱̌O̮o̮ỌọỌ̀ọ̀Ọ́ọ́ỘộỌ̃ọ̃Ọ̄ọ̄Ọ̄̀ọ̄̀Ọ̄́ọ̄́Ọ̄̃ọ̄̃Ọ̄̆ọ̄̆Ọ̆ọ̆Ọ̈ọ̈Ọ̈̀ọ̈̀Ọ̈́ọ̈́Ọ̈̂ọ̈̂Ọ̈̄ọ̈̄Ọ̈̌ọ̈̌Ọ̌ọ̌Ọ̑ọ̑ỢợỌọO̤o̤Ò̤ò̤Ó̤ó̤Ô̤ô̤Ö̤ö̤O̥o̥Ō̥ō̥O̬o̬O̯o̯O̩o̩Õ͔õ͔Ō͔ō͔O̜o̜O̹o̹Ó̹ó̹O̲o̲ᴓᶗꝌꝍⱺꝊꝋƆ́ɔ́Ɔ̀ɔ̀Ɔ̂ɔ̂Ɔ̌ɔ̌Ɔ̃ɔ̃Ɔ̃́ɔ̃́Ɔ̃̀ɔ̃̀Ɔ̃̂ɔ̃̂Ɔ̃̌ɔ̃̌Ɔ̃̍ɔ̃̍Ɔ̃̎ɔ̃̎Ɔ̄ɔ̄Ɔ̆ɔ̆Ɔ̇ɔ̇Ɔ̈ɔ̈Ɔ̈̀ɔ̈̀Ɔ̈́ɔ̈́Ɔ̈̂ɔ̈̂Ɔ̈̌ɔ̈̌Ɔ̌ɔ̌Ɔ̍ɔ̍Ɔ̎ɔ̎Ɔ̣ɔ̣Ɔ̣̀ɔ̣̀Ɔ̣́ɔ̣́Ɔ̣̂ɔ̣̂Ɔ̣̃ɔ̣̃Ɔ̣̈ɔ̣̈Ɔ̣̈̀ɔ̣̈̀Ɔ̣̈́ɔ̣̈́Ɔ̣̈̂ɔ̣̈̂Ɔ̣̈̌ɔ̣̈̌Ɔ̣̌ɔ̣̌Ɔ̤ɔ̤Ɔ̤̀ɔ̤̀Ɔ̤́ɔ̤́Ɔ̤̂ɔ̤̂Ɔ̤̈ɔ̤̈Ɔ̱ɔ̱Ɔ̱̀ɔ̱̀Ɔ̱́ɔ̱́Ɔ̱̂ɔ̱̂Ɔ̱̌ɔ̱̌Ɔ̱̃ɔ̱̃Ɔ̱̈ɔ̱̈Ɔ̱̈̀ɔ̱̈̀Ɔ̱̈́ɔ̱̈́Ɔ̧ɔ̧Ɔ̧̀ɔ̧̀Ɔ̧́ɔ̧́Ɔ̧̂ɔ̧̂Ɔ̧̌ɔ̧̌Ɔ̨ɔ̨Ɔ̨́ɔ̨́Ɔ̨̀ɔ̨̀Ɔ̨̂ɔ̨̂Ɔ̨̌ɔ̨̌Ɔ̨̄ɔ̨̄Ɔ̨̆ɔ̨̆Ɔ̨̈ɔ̨̈Ɔ̨̱ɔ̨̱Ɔ̰ɔ̰Ɔ̰̀ɔ̰̀Ɔ̰́ɔ̰́Ɔ̰̄ɔ̰̄P̀p̀ṔṕP̃p̃P̄p̄P̆p̆ṖṗP̈p̈P̋p̋P̑p̑P̓p̓P̕p̕P̔p̔P͑p͑P̱p̱P̣p̣P̤p̤P̬p̬ⱣᵽꝐꝑᵱᶈƤƥꝒꝓꝔꝕᴘ̇Q́q́Q̃q̃Q̄q̄Q̇q̇Q̈q̈Q̋q̋Q̓q̓Q̕q̕Q̧q̧Q̣q̣Q̣̇q̣̇Q̣̈q̣̈Q̱q̱ꝖꝗꝖ̃ꝗ̃ꝘꝙʠɊɋR̀r̀ŔŕR̂r̂R̃r̃R̄r̄R̆r̆ṘṙR̋r̋ŘřR̍r̍ȐȑȒȓR̓r̓R̕r̕ŖŗR̦r̦R̨r̨R̨̄r̨̄ꞦꞧR̭r̭ṞṟṚṛṚ̀ṛ̀Ṛ́ṛ́ṜṝṜ́ṝ́Ṝ̃ṝ̃Ṝ̆ṝ̆R̤r̤R̥r̥R̥̀r̥̀Ŕ̥ŕ̥R̥̂r̥̂R̥̃r̥̃R̥̄r̥̄R̥̄́r̥̄́R̥̄̆r̥̄̆Ř̥ř̥R̬r̬R̩r̩R̯r̯ɌɍᵲꭨɺᶉɻʵⱹɼⱤɽɾᵳɿʀ̇ʀ̣Ꝛ́ꝛ́Ꝛ̣ꝛ̣S̀s̀ŚśŚ̀ś̀ŚśṤṥŜŝS̃s̃S̄s̄S̄̒s̄̒S̆s̆ṠṡṠ̃ṡ̃S̈s̈S̋s̋ŠšŠ̀š̀Š́š́ṦṧŠ̓š̓S̑s̑S̒s̒S̓s̓S̕s̕ŞşȘșS̨s̨Š̨š̨ꞨꞩS̱s̱Ś̱ś̱S̮s̮ṢṣṢ́ṣ́Ṣ̄ṣ̄ṨṩṢ̌ṣ̌Ṣ̕ṣ̕Ṣ̱ṣ̱S̤s̤Š̤š̤S̥s̥Ś̥S̬s̬S̩s̩S̪s̪ꜱ̇ꜱ̣ſ́ẛſ̣ᵴᶊʂᶳꟅⱾȿẜẝᶋᶘʆT̀t̀T́t́T̃t̃T̄t̄T̆t̆T̆̀t̆̀ṪṫT̈ẗŤťT̑t̑T̓t̓T̕t̕T̔t̔T͑t͑ŢţȚțT̨t̨T̗t̗ṰṱT̰t̰ṮṯT̮t̮ṬṭṬ́ṭ́T̤t̤T̥t̥T̬t̬T̯t̯T̪t̪ƾŦŧȾⱦᵵƫᶵƬƭƮʈȶᴛ̇ᴛ̣ÙùÚúÛûŨũŨ̀ũ̀ṸṹŨ̂ũ̂Ũ̊ũ̊Ũ̌ũ̌Ũ̍ũ̍Ũ̎ũ̎ŪūŪ̀ū̀Ū́ū́Ū̂ū̂Ū̌ū̌Ū̃ū̃Ū̄ū̄Ū̆ū̆Ū̆́ū̆́ṺṻŪ̊ū̊ŬŭŬ̀ŭ̀Ŭ́ŭ́U̇u̇U̇́u̇́U̇̄u̇̄ÜüǛǜǗǘÜ̂ü̂Ü̃ü̃ǕǖǕ̆ǖ̆Ü̆ü̆ǙǚỦủŮůŮ́ů́Ů̃ů̃ŰűǓǔU̍u̍U̎u̎ȔȕȖȗU̓u̓U᷎u᷎ỦủƯưỨứỪừỮữƯ̆ư̆ỬửỰựU̧u̧Ú̧ú̧Ù̧ù̧Û̧û̧Ǔ̧ǔ̧ŲųŲ̀ų̀Ų́ų́Ų̂ų̂Ų̌ų̌Ų̄ų̄Ų̄́ų̄́Ų̄̀ų̄̀Ų̄̂ų̄̂Ų̄̌ų̄̌Ų̄̌ų̄̌Ų̈ų̈Ų̈́ų̈́Ų̈̀ų̈̀Ų̈̂ų̈̂Ų̈̌ų̈̌Ų̈̄ų̈̄Ų̋ų̋Ų̱ų̱Ų̱́ų̱́Ų̱̀ų̱̀ṶṷṴṵṴ̀ṵ̀Ṵ́ṵ́Ṵ̄ṵ̄Ṵ̈ṵ̈U̱u̱Ù̱ù̱Ú̱ú̱Û̱û̱Ũ̱ũ̱Ū̱ū̱Ū̱́ū̱́Ū̱̀ū̱̀Ū̱̂ū̱̂Ü̱ü̱Ǘ̱ǘ̱Ǜ̱ǜ̱Ü̱̂ü̱̂Ǚ̱ǚ̱Ǔ̱ǔ̱ỤụỤ̀ụ̀Ụ́ụ́Ụ̂ụ̂Ụ̃ụ̃Ụ̄ụ̄Ụ̈ụ̈Ụ̈̀ụ̈̀Ụ̈́ụ̈́Ụ̈̂ụ̈̂Ụ̈̌ụ̈̌Ụ̌ụ̌Ụ̍ụ̍ṲṳṲ̀ṳ̀Ṳ́ṳ́Ṳ̂ṳ̂Ṳ̈ṳ̈U̥u̥Ü̥ü̥U̯u̯Ũ̯ũ̯Ü̯ü̯U̩u̩U͔u͔Ũ͔ũ͔Ū͔ū͔ɄʉᶶɄ̀ʉ̀Ʉ́ʉ́Ʉ̂ʉ̂Ʉ̃ʉ̃Ʉ̄ʉ̄Ʉ̈ʉ̈Ʉ̌ʉ̌Ʉ̧ʉ̧Ʉ̰ʉ̰Ʉ̰́ʉ̰́Ʉ̱ʉ̱Ʉ̱́ʉ̱́Ʉ̱̀ʉ̱̀Ʉ̱̂ʉ̱̂Ʉ̱̈ʉ̱̈Ʉ̱̌ʉ̱̌Ʉ̥ʉ̥ꞸꞹᵾᶙꞾꞿʮʯɰᶭƱ̀ʊ̀Ʊ́ʊ́Ʊ̃ʊ̃ᵿV̀v̀V́v́V̂v̂ṼṽṼ̀ṽ̀Ṽ́ṽ́Ṽ̂ṽ̂Ṽ̌ṽ̌V̄v̄V̄̀v̄̀V̄́v̄́V̄̂v̄̂V̄̃v̄̃V̄̄v̄̄V̄̆v̄̆V̄̌v̄̌V̆v̆V̆́v̆́V̇v̇V̈v̈V̈̀v̈̀V̈́v̈́V̈̂v̈̂V̈̄v̈̄V̈̌v̈̌V̊v̊V̋v̋V̌v̌V̍v̍V̏v̏V̐v̐V̓v̓V̧v̧V̨v̨V̨̀v̨̀V̨́v̨́V̨̂v̨̂V̨̌v̨̌V̨̄v̨̄V̨̄́v̨̄́V̨̄̀v̨̄̀V̨̄̂v̨̄̂V̨̄̌v̨̄̌V̨̈v̨̈V̨̈́v̨̈́V̨̈̀v̨̈̀V̨̈̂v̨̈̂V̨̈̌v̨̈̌V̨̈̄v̨̈̄V̨̋v̨̋V̨̱v̨̱V̨̱́v̨̱́V̨̱̀v̨̱̀V̨̱̂v̨̱̂V̨̱̌v̨̱̌V̱v̱V̱̀v̱̀V̱́v̱́V̱̂v̱̂V̱̌v̱̌Ṽ̱ṽ̱V̱̈v̱̈V̱̈́v̱̈́V̱̈̀v̱̈̀V̱̈̂v̱̈̂V̱̈̌v̱̈̌ṾṿV̥v̥ꝞꝟᶌƲʋᶹƲ̀ʋ̀Ʋ́ʋ́Ʋ̂ʋ̂Ʋ̃ʋ̃Ʋ̈ʋ̈Ʋ̌ʋ̌ⱱⱴꝨ́ꝩ́Ꝩ̇ꝩ̇Ꝩ̣ꝩ̣ẀẁẂẃŴŵW̃w̃W̄w̄W̆w̆ẆẇẄẅW̊ẘW̋w̋W̌w̌W̍w̍W̓w̓W̱w̱ẈẉW̥w̥W̬w̬ⱲⱳX̀x̀X́x́X̂x̂X̃x̃X̄x̄X̆x̆X̆́x̆́ẊẋẌẍX̊x̊X̌x̌X̓x̓X̕x̕X̱x̱X̱̓x̱̓X̣x̣X̣̓x̣̓X̥x̥ᶍỲỳÝýŶŷỸỹȲȳȲ̀ȳ̀Ȳ́ȳ́Ȳ̃ȳ̃Ȳ̆ȳ̆Y̆y̆Y̆̀y̆̀Y̆́y̆́ẎẏẎ́ẏ́ŸÿŸ́ÿ́Y̊ẙY̋y̋Y̌y̌Y̍y̍Y̎y̎Y̐y̐Y̓y̓ỶỷY᷎y᷎Y̱y̱ỴỵỴ̣ỵ̣Y̥y̥Y̯y̯ɎɏƳƴỾỿZ̀z̀ŹźẐẑZ̃z̃Z̄z̄ŻżZ̈z̈Z̋z̋ŽžŽ́ž́Ž̏ž̏Z̑z̑Z̓z̓Z̕z̕Z̨z̨Z̗z̗ẔẕZ̮z̮ẒẓẒ́ẓ́Ẓ̌ẓ̌Ẓ̣ẓ̣Z̤z̤Z̥z̥ƵƶᵶᶎꟆȤȥʐᶼʑᶽⱿɀⱫⱬƷ́ʒ́Ʒ̇ʒ̇ǮǯǮ́ǯ́Ʒ̥ʒ̥ᶚƺʓÞ́þ́Þ̣þ̣ꝤꝥꝦꝧƻꜮꜯʡʢꜲꜳꜲ́ꜳ́Ꜳ̋ꜳ̋Ꜳ̇ꜳ̇Ꜳ̈ꜳ̈Ꜳ̣ꜳ̣ÆæᴭÆ̀æ̀ǼǽÆ̂æ̂Æ̌æ̌Æ̃æ̃Æ̃́æ̃́Æ̃̀æ̃̀Æ̃̂æ̃̂Æ̃̌æ̃̌ǢǣǢ́ǣ́Ǣ̂ǣ̂Ǣ̃ǣ̃Ǣ̆ǣ̆Æ̆æ̆Æ̇æ̇Æ̈æ̈Æ̈̀æ̈̀Æ̈́æ̈́Æ̈̂æ̈̂Æ̈̌æ̈̌Æ̊æ̊Æ̋æ̋Æ᷎æ᷎Æ̨æ̨Æ̨̀æ̨̀Ǽ̨ǽ̨Æ̨̂æ̨̂Æ̨̈æ̨̈Ǣ̨ǣ̨Æ̨̌æ̨̌Æ̨̱æ̨̱Æ̱æ̱Æ̱̃æ̱̃Æ̱̈æ̱̈Æ̣æ̣Æ͔̃æ͔̃ᴁᴂᵆꬱꜴꜵꜴ́ꜵ́Ꜵ̋ꜵ̋Ꜵ̣ꜵ̣ꜶꜷꜶ́ꜷ́Ꜷ̣ꜷ̣ꜸꜹꜺꜻꜸ́ꜹ́Ꜹ̋ꜹ̋Ꜹ̨ꜹ̨Ꜹ̣ꜹ̣Ꜻ́ꜻ́ꜼꜽꜼ̇ꜽ̇Ꜽ̣ꜽ̣ȸǱǲǳʣǄǅǆꭦʥʤﬀﬃﬄﬁﬂʩĲĳꭡǇǈǉỺỻʪʫɮǊǋǌŒœꟹŒ̀œ̀Œ́œ́Œ̂œ̂Œ̃œ̃Œ̄œ̄Œ̄́œ̄́Œ̄̃œ̄̃Œ̄̆œ̄̆Œ̋œ̋Œ̌œ̌Œ̨œ̨Œ̨̃œ̨̃Œ̣œ̣Œ̯œ̯ɶᴔꭂꭁꭢꝎꝏꝎ́ꝏ́Ꝏ̈ꝏ̈Ꝏ̋ꝏ̋Ꝏ̣ꝏ̣ꭃꭄȹẞßﬆﬅʨᵺʦꭧʧꜨꜩꭀᵫꭐꭑꭣꝠꝡꝠ̈ꝡ̈Ꝡ̋ꝡ̋ꭠ]*/gm
    );
    if (name == "") {
      res.json({
        status: "FAILED",
        message: "Empty input field!",
      });
      // TODO: add a model to verify
    } else if (charlist.test(name)) {
      res.json({
        status: "FAILED",
        message: "Invalid name",
      });
    } else {
      const newAlbum = new Albums({
        userId,
        name,
        date,
      });
      newAlbum
        .save()
        .then((response) => {
          res.json({
            status: "SUCCESS",
            message: "Album created successfully",
            data: response,
          });
        })
        .catch(() => {
          res.status(400).json({
            status: "FAILURE",
            message: "Failed save album",
          });
        });
    }
  } catch (error) {
    res.status(400).json({
      status: "FAILURE",
      message: "Failed to create album",
    });
  }
};

const deleteAlbum = (req, res) => {
  const uid = req.user._id;
  const aid = req.params.id;
  Albums.findById(aid)
    .then((data) => {
      if (data.userId == uid) {
        Albums.deleteOne({ _id: aid }).then((response) => {
          if (response.deletedCount == 0) {
            return res.status(400).json({
              status: "FAILED",
              message: "Album already deleted",
            });
          } else {
            return res.json({
              status: "SUCCESS",
              message: "Album successfully deleted",
            });
          }
        });
      }
    })
    .catch(() => {
      return res.status(400).json({
        status: "FAILED",
        message: "Album not found",
      });
    });
};

const addPhotoAlbum = async (req, res) => {
  const uid = req.user._id;
  const aid = req.body.albumId;
  const pid = req.body.photoId;

  const album = await Albums.findOne({ _id: aid });
  if (album) {
    const OldPhoto = await Photo.findById(pid);
    if (OldPhoto.userId == uid && album.userId == uid) {
      // User is the owner of the photo and the album
      const albumExistInPhoto = OldPhoto.albums.filter((itm) => {
        return itm == aid;
      });
      if (albumExistInPhoto.length > 0) {
        // Photo already in the album
        return res.status(400).json({
          status: "FAILED",
          message: "Photo is already in the album",
        });
      }
      try {
        const albums = [...OldPhoto.albums, aid];
        await Photo.updateOne(
          { _id: pid },
          {
            albums: albums,
          }
        );
        return res.json({
          status: "SUCCESS",
          message: "Photo successfully added to album",
        });
      } catch (error) {
        return res.status(400).json({
          status: "FAILED",
          message: "Error while adding photo to album",
        });
      }
    } else {
      return res.status(403).json({
        status: "FAILED",
        message: "Access denied",
      });
    }
  } else {
    return res.status(404).json({
      status: "FAILED",
      message: "Album not found",
    });
  }
};

const removePhotoAlbum = async (req, res) => {
  const uid = req.user._id;
  const aid = req.body.albumId;
  const pid = req.body.photoId;

  const album = await Albums.findOne({ _id: aid });
  if (album) {
    const OldPhoto = await Photo.findById(pid);
    if (OldPhoto.userId == uid && album.userId == uid) {
      // User is the owner of the photo and the album
      const albumExistInPhoto = OldPhoto.albums.filter((itm) => {
        return itm == aid;
      });
      if (albumExistInPhoto.length === 0) {
        // Photo already in the album
        return res.status(400).json({
          status: "FAILED",
          message: "Photo is not in the album",
        });
      }
      try {
        const albums = OldPhoto.albums.filter(itm => {
          return itm != aid;
        });
        await Photo.updateOne(
          { _id: pid },
          {
            albums: albums,
          }
        );
        return res.json({
          status: "SUCCESS",
          message: "Photo successfully removed to album",
        });
      } catch (error) {
        return res.status(400).json({
          status: "FAILED",
          message: "Error while removing photo to album",
        });
      }
    } else {
      return res.status(403).json({
        status: "FAILED",
        message: "Access denied",
      });
    }
  } else {
    return res.status(404).json({
      status: "FAILED",
      message: "Album not found",
    });
  }
};

module.exports = {
  addAlbum,
  deleteAlbum,
  addPhotoAlbum,
  removePhotoAlbum,
};
