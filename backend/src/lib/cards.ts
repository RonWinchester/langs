import _ from "lodash";

export const cards = _.times(100, (i) => ({
    id: i ,
    theme: `Theme ${i }`,
    leftWords: _.shuffle(_.times(10, (j) => ({
        id: j + 1,
        text: `Русское слово ${j + 1}`,
    }))),
    rightWords: _.shuffle(_.times(10, (j) => ({
        id: j + 1,
        text: `English word ${j + 1}`,
    }))),
}));