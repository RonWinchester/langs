// import { classNames } from "./classNames";

// describe("classNames", () => {
//     test("only first param", () => {
//         expect(classNames("someClass")).toBe("someClass");
//     });

//     test("addintional class", () => {
//         const expected = "someClass class1 class2";
//         expect(classNames("someClass", {}, ["class1", "class2"])).toBe(
//             expected,
//         );
//     });

//     test("width mods", () => {
//         const expected = "someClass class1 class2 hovered scrollable";
//         expect(
//             classNames("someClass", { hovered: true, scrollable: true }, [
//                 "class1",
//                 "class2",
//             ]),
//         ).toBe(expected);
//     });

//     test("width mods false", () => {
//         const expected = "someClass class1 class2 hovered";
//         expect(
//             classNames("someClass", { hovered: true, scrollable: false }, [
//                 "class1",
//                 "class2",
//             ]),
//         ).toBe(expected);
//     });

//     test("width mods undefined", () => {
//         const expected = "someClass class1 class2";
//         expect(
//             classNames("someClass", { hovered: undefined, scrollable: false }, [
//                 "class1",
//                 "class2",
//             ]),
//         ).toBe(expected);
//     });
// });
