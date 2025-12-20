"use client"

import {
    HiOutlineSparkles,
    HiOutlineCpuChip,
    HiOutlineLightBulb,
    HiOutlineMagnifyingGlass,
    HiOutlineAdjustmentsHorizontal,
    HiOutlinePresentationChartLine,
} from "react-icons/hi2"

import styles from "../../styles/FlowSection.module.css"

const steps = [
    { title: "Input Signal", desc: "Creative intent enters the system.", icon: HiOutlineSparkles },
    { title: "Context Analysis", desc: "Meaning and structure are understood.", icon: HiOutlineCpuChip },
    { title: "Idea Expansion", desc: "Multiple creative paths explored.", icon: HiOutlineLightBulb },
    { title: "Reasoning Layer", desc: "Ideas are validated and filtered.", icon: HiOutlineMagnifyingGlass },
    { title: "Refinement Loop", desc: "Output is optimized and clarified.", icon: HiOutlineAdjustmentsHorizontal },
    { title: "Final Output", desc: "Polished, production-ready result.", icon: HiOutlinePresentationChartLine },
]

export default function SarjanPerfectFlow() {
    return (
        <section className={styles.wrapper}>
            {/* HEADER */}
            <div className={styles.header}>
                <span className={styles.eyebrow}>SARJAN AI ARCHITECTURE</span>
                <h2>How Sarjan Thinks</h2>
                <p>
                    A structured creative flow where intent is transformed into
                    refined, intelligent output through multiple reasoning layers.
                </p>
            </div>

            {/* FLOW */}
            <div className={styles.flow}>
                <div className={styles.spine} />

                {steps.map((step, i) => {
                    const Icon = step.icon
                    const side = i % 2 === 0 ? "left" : "right"

                    return (
                        <div key={i} className={`${styles.row} ${styles[side]}`}>
                            <div className={styles.card}>
                                <div className={styles.icon}>
                                    <Icon size={22} />
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>

                            <span className={styles.line} />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
