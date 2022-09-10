<template>
    <div style="background-color: #333;padding:10px;">
        <div class="rhythm_title">节拍选择</div>
        <tr class="row" :key="i" v-for="(row, i) in rhymePatternRows">
            <td
                style="padding:5px;"
                :key="j"
                v-for="(rp, j) in row"
            >
                <div
                    class="musical-note-container"
                    @click="setRhymePattern(notes[rp]['rhymePattern'])"
                >
                    <MusicalNote
                        :color="
                            notes[rp]['rhymePattern'] == rhymePattern
                                ? 'rgb(49, 145, 231)'
                                : '#cccccc'
                        "
                        backgroundColor="#1d1d1d"
                        class="musical-note"
                        :description="description"
                        :key="k"
                        v-for="(description, k) in notes[rp]['descriptions']"
                    >
                    </MusicalNote>
                </div>
            </td>
        </tr>
    </div>
</template>

<script>
import MusicalNote from "../MusicalNote";
export default {
    name: "Rhythm",
    data() {
        return {
            rhymePattern: "1",
            notes: {
                "1/4": {
                    descriptions: ["stem,head"],
                    rhymePattern: "1",
                },
                "1/8_1/8": {
                    descriptions: [
                        "stem,head|hline one|hline  one|stem,head,hline one",
                    ],
                    rhymePattern: "12",
                },
                "1/16_1/16_1/16_1/16": {
                    descriptions: [
                        "stem,head|w1o3@stem,head,hline one,hline two|w1o3@stem,head,hline one,hline two|w1o3@stem,head,hline one,hline two",
                    ],
                    rhymePattern: "1222",
                },
                "1/16_1/16_1/16_1/16_1/4": {
                    descriptions: [
                        "stem,head|w1o3@stem,head,hline one,hline two|w1o3@stem,head,hline one,hline two|w1o3@stem,head,hline one,hline two",
                        "stem,head",
                    ],
                    rhymePattern: "1222,1",
                },
                "1/12_1/12_1/12": {
                    descriptions: [
                        "tuple t3>stem,head|hline one|stem,head,hline one|hline one|stem,head,hline one",
                    ],
                    rhymePattern: "122",
                },
                "1/12_1/12_1/12_1/4": {
                    descriptions: [
                        "tuple t3>stem,head|hline one|stem,head,hline one|hline one|stem,head,hline one",
                        "stem,head",
                    ],
                    rhymePattern: "122,1",
                },
                "1/20_1/20_1/20_1/20_1/20": {
                    descriptions: [
                        "tuple t5>stem,head|w1o5@hline one,stem,head|w1o5@hline one,stem,head|w1o5@hline one,stem,head|w1o5@hline one,stem,head",
                    ],
                    rhymePattern: "12222",
                },
                "1/20_1/20_1/20_1/20_1/20_1/4": {
                    descriptions: [
                        "tuple t5>stem,head|w1o3@hline one,stem,head|w1o3@hline one,stem,head|w1o3@hline one,stem,head|w1o3@hline one,stem,head",
                        "stem,head",
                    ],
                    rhymePattern: "12222,1",
                },
                "3/16_1/16": {
                    descriptions: [
                        "stem,head|hline one,dot|hline one|stem,head,hline one,hline two",
                    ],
                    rhymePattern: "1002",
                },
                "3/16_1/16_1/4": {
                    descriptions: [
                        "stem,head|hline one,dot|hline one|stem,head,hline one,hline two",
                        "stem,head",
                    ],
                    rhymePattern: "1002,1",
                },
                "1/16_3/16": {
                    descriptions: [
                        "stem,head|hline one,hline two|w1o5@hline one,stem,head|dot",
                    ],
                    rhymePattern: "1200",
                },
                "1/16_3/16_1/4": {
                    descriptions: [
                        "stem,head|hline one,hline two|w1o5@hline one,stem,head|dot",
                        "stem,head",
                    ],
                    rhymePattern: "1200,1",
                },
                "1/8_1/16_1/16": {
                    descriptions: [
                        "stem,head|w1o5@stem,head,hline one|w1o5@stem,head,hline one,hline two",
                    ],
                    rhymePattern: "1022",
                },
                "1/8_1/16_1/16_1/4": {
                    descriptions: [
                        "stem,head|w1o5@stem,head,hline one|w1o5@stem,head,hline one,hline two",
                        "stem,head",
                    ],
                    rhymePattern: "1022,1",
                },
                "1/16_1/16_1/8": {
                    descriptions: [
                        "stem,head|w1o5@stem,head,hline one, hline two|w1o5@stem,head,hline one",
                    ],
                    rhymePattern: "1220",
                },
                "1/16_1/16_1/8_1/4": {
                    descriptions: [
                        "stem,head|w1o5@stem,head,hline one, hline two|w1o5@stem,head,hline one",
                        "stem,head",
                    ],
                    rhymePattern: "1220,1",
                },
                "1/16_1/8_1/16": {
                    descriptions: [
                        "stem,head|hline one,hline two|w1o5@hline one,stem,head|w1o5@hline one|hline one,hline two,stem,head",
                    ],
                    rhymePattern: "1202",
                },
                "1/16_1/8_1/16_1/4": {
                    descriptions: [
                        "stem,head|hline one,hline two|w1o5@hline one,stem,head|w1o5@hline one|hline one,hline two,stem,head",
                        "stem,head",
                    ],
                    rhymePattern: "1202,1",
                },
                "1/8_1/4_1/8": {
                    descriptions: [
                        "stem,head|flag|stem,head|empty|stem,head|flag",
                    ],
                    rhymePattern: "12,02",
                },
                "1/8_1/4_1/8_1/4": {
                    descriptions: [
                        "stem,head|flag|stem,head|empty|stem,head|flag|stem,head",
                    ],
                    rhymePattern: "12,02,1",
                },
                "3/32_1/32_1/16_1/16": {
                    descriptions: [
                        "stem,head|hline one,hline two,dot|w1o2@stem,head,hline one,hline two,hline three|w1o5@stem,head,hline one, hline two|w1o5@stem,head,hline one, hline two",
                    ],
                    rhymePattern: "10022020",
                },
                "3/32_1/32_1/16_1/16_1/4": {
                    descriptions: [
                        "stem,head|hline one,hline two,dot|w1o2@stem,head,hline one,hline two,hline three|w1o5@stem,head,hline one, hline two|w1o5@stem,head,hline one, hline two",
                        "stem,head",
                    ],
                    rhymePattern: "10022020,1",
                },
                "3/8_1/16_1/16": {
                    descriptions: [
                        "stem,head|dot",
                        "stem,head|w1o5@hline one,hline two,stem,head",
                    ],
                    rhymePattern: "1,0022",
                },
                "3/8_1/16_1/16_1/4": {
                    descriptions: [
                        "stem,head|dot",
                        "stem,head|w1o5@hline one,hline two,stem,head",
                        "stem,head",
                    ],
                    rhymePattern: "1,0022,1",
                },
                "1/16_1/16_3/8": {
                    descriptions: [
                        "stem,head|w1o5@hline one,hline two,stem,head",
                        "stem,head|dot",
                    ],
                    rhymePattern: "1220,0",
                },
                "1/16_1/16_3/8_1/4": {
                    descriptions: [
                        "stem,head|w1o5@hline one,hline two,stem,head",
                        "stem,head|dot",
                        "stem,head",
                    ],
                    rhymePattern: "1220,0,1",
                },
            },
            rhymePatternRows: [
                ["1/4", "1/8_1/8"],
                [
                    "1/16_1/16_1/16_1/16",
                    "1/16_1/16_1/16_1/16_1/4",
                    "3/32_1/32_1/16_1/16",
                    "3/32_1/32_1/16_1/16_1/4",
                ],
                [
                    "1/12_1/12_1/12",
                    "1/12_1/12_1/12_1/4",
                    "1/20_1/20_1/20_1/20_1/20",
                    "1/20_1/20_1/20_1/20_1/20_1/4",
                ],
                ["3/16_1/16", "3/16_1/16_1/4", "1/16_3/16", "1/16_3/16_1/4"],
                [
                    "1/16_1/16_1/8",
                    "1/16_1/16_1/8_1/4",
                    "1/8_1/16_1/16",
                    "1/8_1/16_1/16_1/4",
                ],
                [
                    "1/16_1/8_1/16",
                    "1/16_1/8_1/16_1/4",
                    "1/8_1/4_1/8",
                    "1/8_1/4_1/8_1/4",
                ],
                [
                    "3/8_1/16_1/16",
                    "3/8_1/16_1/16_1/4",
                    "1/16_1/16_3/8",
                    "1/16_1/16_3/8_1/4",
                ],
            ],
        };
    },
    components: {
        MusicalNote,
    },
    props: ["changeRhymePattern"],
    methods: {
        setRhymePattern(rhymePattern) {
            this.rhymePattern = rhymePattern;
            this.changeRhymePattern(rhymePattern);
        },
    },
};
</script>

<style>
.rhythm_title {
    text-align: center;
    color: #ccc;
    font-size: 18px;
    padding: 10px;
}

.row {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: flex-start;
    align-content: flex-start;
    width: 99%;
    height: 50px;
    border: 0;
    z-index: 200;
}
.col {
    flex-grow: 1;
    flex-shrink: 1;
    display: block;
    border: 1px solid #ccc;
    border-right: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    padding: 0;
    /* margin: 3px; */
    height: calc(100% - 1px);
    overflow: hidden;
}
.col:last-child {
    border-right: 0;
}
.col-rp-selected {
    box-shadow: 0 0 5px white;
}
/* .row:first-child .col {
    border-top: 0;
} */
.musical-note-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    width: calc(100% - 20px);
    height: calc(100% - 30px);
    margin: 15px auto;
}
.musical-note:last-child {
    margin-right: 0;
}
.musical-note {
    flex-shrink: 1;
    flex-grow: 0;
    margin-right: 10px;
}
.bpm-control {
    font-size: 18px;
    line-height: 50px;
    color: #cccccc;
    text-align: center;
}
.bpm-control .btn {
    display: inline-block;
    width: 32px;
    height: 32px;
    /* border: 1px solid #cccccc; */
    border-radius: 50%;
    color: #cccccc;
    font-size: 32px;
    line-height: 32px;
    background-color: #333333;
    font-style: normal;
}
.bpm-control .btn-left {
    margin-right: 10px;
}
.bpm-control .btn-right {
    margin-left: 10px;
}
</style>