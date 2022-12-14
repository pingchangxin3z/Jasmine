<template>
    <div class="metronome" ref="metronome" :style="cssProps">
        <div class="rotate-box" ref="rotateBox">
            <div class="ball"></div>
        </div>
    </div>
</template>

<script>
import { TimelineLite, Power0 } from "gsap";

export default {
    name: "Metronome",
    props: {
        bpm: {
            type: Number,
            default: 40,
        },
        rhymePattern: {
            type: String,
            default: "1",
        },
    },
    computed: {
        period() {
            return Math.floor((60 * 1000) / this.bpm);
        },
        beats() {
            let beats = [];

            let notes = this.rhymePattern.split(",");
            for (let note of notes) {
                let beat = [];

                let length = note.length;
                for (let j = 0; j < length; j++) {
                    let char = note.charAt(j);
                    if (char !== "0") {
                        beat.push({
                            time: (this.period * j) / length,
                            type: char,
                        });
                    }
                }
                console.log(beat);
                beats.push(beat);
            }

            return beats;
        },
        cssProps() {
            return {
                "--ball-radius": "20px",
                "--rotate-box-height": this.rbHeight + "px",
            };
        },
    },
    data() {
        return {
            rbHeight: 0,
            rbAngle: "0rad",
            ballTimeline: null,

            started: false,
            timer: null,
            beatTimers: [],
            counter: 0,

            audioCtx: null,
            gain: null,
            beepFrequency: {
                1: 800,
                2: 7000,
            },
        };
    },
    methods: {
        beep(type) {
            let oscillator = this.audioCtx.createOscillator();
            oscillator.connect(this.gain);
            oscillator.frequency.value = this.beepFrequency[type];
            oscillator.type = "sine";
            oscillator.start(0);
            oscillator.stop(this.audioCtx.currentTime + 0.005);
        },
        start() {
            this.started = true;
            this.counter = 0;
            this.ballTimeline = new TimelineLite();
            this.playInOnePeriod();
            this.timer = setInterval(
                function () {
                    this.playInOnePeriod();
                }.bind(this),
                this.period
            );
        },
        stop() {
            this.started = false;
            if (this.ballTimeline !== null) {
                this.ballTimeline.pause();
                this.ballTimeline.progress(0);
                this.ballTimeline.kill();
                this.ballTimeline = null;
            }
            this.counter = 0;
            clearInterval(this.timer);
            this.timer = null;
            for (let i = 0; i < this.beatTimers.length; i++) {
                clearTimeout(this.beatTimers[i]);
            }
        },
        playInOnePeriod() {
            if (this.counter == 0) {
                this.ballTimeline.to(this.$refs.rotateBox, this.period / 1000, {
                    ease: Power0.easeNone,
                    rotation: this.rbAngle,
                });
            } else if (this.counter > 0 && this.counter % 2 == 0) {
                this.ballTimeline.play();
            } else if (this.counter > 0 && this.counter % 2 == 1) {
                this.ballTimeline.reverse();
            }

            let which = this.counter % this.beats.length;
            for (let beat of this.beats[which]) {
                this.beatTimers = [];
                let beatTimer = setTimeout(
                    function () {
                        this.beep(beat.type);
                    }.bind(this),
                    beat.time
                );
                this.beatTimers.push(beatTimer);
            }

            this.counter = this.counter + 1;
        },
    },
    watch: {
        bpm() {
            if (this.started) {
                this.stop();
                this.start();
            }
        },
    },
    mounted() {
        let mwidth = this.$refs.metronome.clientWidth;
        let mheight = this.$refs.metronome.clientHeight;

        let motionRadius =
            (mwidth * mwidth + 4 * mheight * mheight) / (8 * mheight);
        this.rbAngle =
            ((2 * Math.asin(mwidth / (2 * motionRadius))) / Math.PI) * 180;
        this.rbHeight =
            2 *
            Math.sqrt(
                motionRadius * motionRadius - (mwidth / 2) * (mwidth / 2)
            );

        this.audioCtx = new AudioContext();
        this.gain = this.audioCtx.createGain();
        this.gain.connect(this.audioCtx.destination);
    },
};
</script>

<style scoped>
.metronome {
    width: calc(100% - var(--ball-radius) * 2);
    height: calc(100% - var(--ball-radius) * 2);
    margin: 0 var(--ball-radius);
    padding: 0;
    border: 0;
    position: relative;
}
.rotate-box {
    position: absolute;
    margin: 0;
    padding: 0;
    border: 0;
    width: 100%;
    height: var(--rotate-box-height);
    left: 0;
    top: 100%;
}
.ball {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
}
.ball::before {
    content: "";
    flex: none;
    width: calc(var(--ball-radius) * 2);
    height: calc(var(--ball-radius) * 2);
    display: block;
    margin: 0;
    padding: 0;
    border-radius: 100%;
    background-color: #219de6;
    box-shadow: inset -25px -15px 50px rgba(0, 0, 0, 0.3);
    background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 220, 0.3) 0%,
        transparent 300%
    );
}
</style>