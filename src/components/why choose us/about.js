"use client"

import {
    HiOutlineCpuChip,
    HiOutlineBeaker,
    HiOutlineBolt,
    HiOutlineShieldCheck,
    HiOutlineSparkles,
    HiOutlineArrowPath
} from "react-icons/hi2"

import styles from "../../styles/WhySarjanAI.module.css"

const features = [
    {
        title: "Multi-Agent Intelligence",
        desc: "Specialized AI agents collaborate like a creative team — not a single model.",
        icon: HiOutlineCpuChip,
    },
    {
        title: "Reasoned Creativity",
        desc: "Every idea is generated, evaluated, and refined with logical reasoning.",
        icon: HiOutlineBeaker,
    },
    {
        title: "Lightning Fast Output",
        desc: "Complex creative workflows completed in seconds, not hours.",
        icon: HiOutlineBolt,
    },
    {
        title: "Enterprise-Grade Reliability",
        desc: "Designed for accuracy, consistency, and production-level use.",
        icon: HiOutlineShieldCheck,
    },
    {
        title: "Polished Final Results",
        desc: "Outputs are clear, usable, and presentation-ready by default.",
        icon: HiOutlineSparkles,
    },
    {
        title: "Adaptive Learning Engine",
        desc: "Continuously improves responses by understanding context, feedback, and intent over time.",
        icon: HiOutlineArrowPath,
    },

]

export default function WhySarjanAI() {
    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <span className={styles.label}>WHY SARJAN AI</span>
                    <h2>Built for Serious Creativity</h2>
                    <p>
                        Not just intelligent — engineered to think, refine, and deliver
                        with precision.
                    </p>
                </header>

                {/* Feature Grid */}
                <div className={styles.grid}>
                    {features.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <div key={i} className={styles.card}>
                                <div className={styles.glow} />
                                <div className={styles.icon}>
                                    <Icon size={26} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
