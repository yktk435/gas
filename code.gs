function myFunction() {
    // spreadSheetオブジェクトを取得
    let spreadSheetById = SpreadsheetApp.openById("10CarvKMjvq_Upq_3FTJULfExF4GMlS8wBFks44yNdVg")

    // スプレッドシートの名前を表示する
    Logger.log(spreadSheetById.getName())
    // sheetオブジェクトの取得
    let sheetByName = spreadSheetById.getSheetByName("doda整理")
    Logger.log(sheetByName.getName())
    let ragetByCellName = sheetByName.getRange("B3")
    let str = ragetByCellName.getValue()

    Logger.log(str)

}

function getMyData() {
    var ss_id = '10CarvKMjvq_Upq_3FTJULfExF4GMlS8wBFks44yNdVg';
    var sh_name = 'doda整理';
    var sh = SpreadsheetApp.openById(ss_id).getSheetByName(sh_name);
    sh.getRange("A4").setValue('=QUERY(doda!1:1338,"SELECT * WHERE B contains \'' + '未経験' + '\'",1\)');
    const lastRow = sh.getLastRow();
    for (var i = 2; i <= lastRow; i++) {
        var title = sh.getRange(i, 2).getValue();
        var myval = sh.getRange(i, 4).getValue();
        console.log(title + ' ' + myval);
    }
}
function sortData() {

    var ss_id = '10CarvKMjvq_Upq_3FTJULfExF4GMlS8wBFks44yNdVg';
    let doda = SpreadsheetApp.openById(ss_id).getSheetByName('doda');
    var sh_name = 'doda整理';
    var sh = SpreadsheetApp.openById(ss_id).getSheetByName(sh_name);
    let sort = sh.getRange("D1").getValue()

    let and = createAnd(sh, 2, "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U")
    let or = createOr(sh, 3, "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U")
    let not = createNot(sh, "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U")
    console.log('and', and)
    console.log('or', or)
    console.log('not', not)
    let textArr = []

    if (not.length) textArr.push('(' + not.join(' and ') + ')')
    if (and.length) textArr.push('(' + and.join(' and ') + ')')
    if (or.length) textArr.push('(' + or.join(' and ') + ')')
    console.log('or',or.length)

    //let text = '=QUERY(doda!1:' + doda.getLastRow() + ',"SELECT * WHERE '

    //    text += '(' + not.join(' and ') + ')'
    //  text += ' and '
    // text += '((' + and.join(' and ') + ')' + ' and ' + '(' + or.join(' or ') + '))'
    // text += ' order by ' + sort + ' desc")'
        console.log('これは')
    console.log(textArr)
        console.log(textArr.join(' and '))
    sh.getRange("A4").setValue('=QUERY(doda!1:' + doda.getLastRow() + ',"SELECT * WHERE '+textArr.join(' and ')+' order by ' + sort + ' desc")');
}

function createOr(sh, num, ...row) {
    let res = []
    row.forEach(i => {
        if (sh.getRange(i + num).getValue() != '' && !sh.getRange(i + num).getValue().match(/^\s/)) {
            let arr = sh.getRange(i + num).getValue().split(' ')
            let andArr = arr.map(j => i + ' contains \'' + j + '\'')

            res = res.concat('('+andArr.join(' or ')+')')
        }
    })
    return res.filter(Boolean)
}

function createAnd(sh, num, ...row) {
    let res = []
    row.forEach(i => {
        if (sh.getRange(i + num).getValue() != '' && !sh.getRange(i + num).getValue().match(/^\s/)) {
            let arr = sh.getRange(i + num).getValue().split(' ')
            let andArr = arr.map(j => i + ' contains \'' + j + '\'')

            res = res.concat('('+andArr.join(' and ')+')')
        }
    })
    return res.filter(Boolean)
}


function createNot(sh, ...row) {
    let res = []
    row.forEach(i => {
        if (sh.getRange(i + "1").getValue() != '' && !sh.getRange(i + "1").getValue().match(/^\s/)) {
            let arr = sh.getRange(i + "1").getValue().split(' ')
            let andArr = arr.map(j => 'not(' + i + ' contains \'' + j + '\')')
            res = res.concat(andArr)
        }
    })
    return res.filter(Boolean)
}
