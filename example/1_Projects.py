import streamlit as st
from PIL import Image
import os

# Page configuration
st.set_page_config(
    page_title="Projects | Chenghao Wang - Portfolio",
    page_icon="🚀",
    layout="wide",
)

# Custom CSS
def local_css():
    st.markdown("""
    <style>
        .main {
            padding: 2rem 2rem;
        }
        h1, h2, h3 {
            font-family: 'Helvetica', sans-serif;
        }
        .block-container {
            padding-top: 2rem;
            padding-bottom: 2rem;
        }
        .section-header {
            color: #1E3A8A;
            border-bottom: 2px solid #1E3A8A;
            padding-bottom: 0.5rem;
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        .project-card {
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            background-color: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .project-card:hover {
            transform: translateY(-5px);
        }
        .skill-tag {
            background-color: #E2E8F0;
            padding: 4px 8px;
            border-radius: 15px;
            font-size: 0.85rem;
            color: #1E3A8A;
            display: inline-flex;
            margin-right: 4px;
            margin-bottom: 4px;
            white-space: nowrap;
        }
        .skills-container {
            margin-top: 8px;
            margin-bottom: 15px;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            max-width: 100%;
        }
        .stTabs [data-baseweb="tab-list"] {
            gap: 2rem;
        }
        .stTabs [data-baseweb="tab"] {
            height: 4rem;
            white-space: pre-wrap;
            font-size: 1rem;
            font-weight: 600;
            color: #1E3A8A;
        }
        .directory-card {
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 20px;
            background-color: #f8f9fa;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .directory-item {
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .directory-item:hover {
            background-color: #E2E8F0;
            cursor: pointer;
        }
        .directory-title {
            font-weight: 600;
            color: #1E3A8A;
            margin-bottom: 5px;
        }
        .directory-description {
            font-size: 0.9rem;
            color: #4B5563;
        }
        .category-section {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid #E2E8F0;
        }
    </style>
    """, unsafe_allow_html=True)

local_css()

# Page header
st.markdown('<h1 class="section-header">My Projects</h1>', unsafe_allow_html=True)
st.write("Here are some of the key projects I've worked on. Each demonstrates my technical skills and problem-solving abilities.")

# Project categories tabs
project_tabs = st.tabs([
    "Robotics and Hardware", 
    "Design and Prototyping", 
    "Data Science and AI", 
    "Business and Management"
])

# Tab 1: Robotics Projects
with project_tabs[0]:
    # Directory section
    st.markdown('<div class="directory-card">', unsafe_allow_html=True)
    st.markdown("### Directory")
    st.markdown("Navigate to specific projects:")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Project 1 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#desktop-robot" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Desktop Companion Robot</div>
                    <div class="directory-description">An interactive desktop robot with social capabilities designed for daily assistance and companionship.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
        # Project 2 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#robot-arm" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">6-DOF Robot Arm</div>
                    <div class="directory-description">A versatile robotic arm designed for precise manipulation tasks in educational settings.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
    
    with col2:
        # Project 3 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#autonomous-vehicle" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Autonomous Navigation System</div>
                    <div class="directory-description">A navigation system for small-scale autonomous vehicles using ROS and computer vision.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
        # Project 4 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#drone-project" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Aerial Drone Project</div>
                    <div class="directory-description">A custom drone platform with environmental sensing capabilities for urban monitoring.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 1
    st.markdown('<div id="desktop-robot" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Desktop Companion Robot")
    st.markdown("**Duration:** September 2023 - Present")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/cute-robot-holding-phone-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3717.jpg", caption="Desktop Robot Prototype")
    
    with col2:
        st.markdown("""
        ### Overview
        As Product Director at Tangwen Zhixin Technology, I led the development of an interactive desktop companion robot with social capabilities designed to provide assistance, entertainment, and companionship.
        
        ### Challenge
        Creating a robot that could both understand human intentions and respond with appropriate social cues while maintaining an affordable price point for consumer markets.
        
        ### Solution
        We developed a compact desktop robot with:
        - Natural language processing capabilities for human-robot communication
        - Computer vision systems for user recognition and basic object detection
        - Expressive movement patterns to convey emotion and intent
        - Cloud-connected intelligence with on-device processing for privacy
        
        ### Key Contributions
        - Developed the product roadmap and technical specifications
        - Created interaction design protocols for natural human-robot interactions
        - Led a team of 5 engineers in implementing the prototype
        - Secured $300,000 in seed funding from MiraclePlus
        - Showcased the prototype at the China International High-tech Expo (CHITEC)
        
        ### Results
        - Successfully developed a working prototype within 8 months
        - Received positive feedback from potential customers in early demonstrations
        - Established the foundation for product expansion and market validation
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["Python", "ROS2", "Arduino", "Machine Learning", "Computer Vision", "NLP", "3D Printing", "Fusion 360"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 2
    st.markdown('<div id="robot-arm" class="project-card">', unsafe_allow_html=True)
    st.markdown("## 6-DOF Robot Arm")
    st.markdown("**Duration:** May 2023 - December 2023")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/premium-photo/robot-arm-industrial-white-background_36367-76.jpg", caption="Robot Arm Prototype")
    
    with col2:
        st.markdown("""
        ### Overview
        Designed and built a 6-degree of freedom robotic arm for educational purposes at Tsinghua University, enabling students to learn about inverse kinematics and robotic control.
        
        ### Challenge
        Creating an affordable yet precise robotic arm that could serve as a learning platform while maintaining sufficient payload capacity for practical demonstrations.
        
        ### Solution
        Developed a modular design with:
        - 6 servo motors with varying torque capabilities
        - 3D printed structural components for cost-effective customization
        - Custom control PCB with Arduino integration
        - ROS-based software for programming and control
        
        ### Key Contributions
        - Designed the mechanical structure and joints
        - Engineered the control systems and electronic interfaces
        - Developed educational materials and exercises
        - Created a calibration system for high precision
        
        ### Results
        - Achieved 0.5mm positioning accuracy
        - Successfully implemented in undergraduate robotics courses
        - Used by 3 research groups for various manipulation experiments
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["ROS", "C++", "Arduino", "CAD", "3D Printing", "PCB Design", "Servo Control", "Inverse Kinematics"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 3
    st.markdown('<div id="autonomous-vehicle" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Autonomous Navigation System")
    st.markdown("**Duration:** January 2022 - June 2022")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/autonomous-car-concept-illustration_114360-8447.jpg", caption="Navigation System")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed an autonomous navigation system for small-scale vehicles, combining computer vision with sensor fusion to navigate indoor environments.
        
        ### Challenge
        Creating a reliable navigation system that could operate without GPS in indoor environments while avoiding obstacles and following designated paths.
        
        ### Solution
        Implemented a system featuring:
        - LiDAR-based SLAM for mapping and localization
        - Computer vision for lane detection and object recognition
        - Sensor fusion algorithm combining data from multiple sensors
        - Path planning and obstacle avoidance algorithms
        
        ### Key Contributions
        - Developed the sensor fusion architecture
        - Implemented computer vision algorithms for feature detection
        - Created the obstacle avoidance system
        - Optimized the navigation algorithms for resource-constrained hardware
        
        ### Results
        - Successfully navigated complex indoor courses with 95% accuracy
        - Demonstrated at a university technology showcase
        - Published navigation algorithms as open-source resources
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["ROS", "Python", "Computer Vision", "SLAM", "Sensor Fusion", "Path Planning", "Raspberry Pi", "LiDAR"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 4
    st.markdown('<div id="drone-project" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Aerial Drone Project")
    st.markdown("**Duration:** April 2021 - November 2021")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/drone-realistic-composition-with-flying-quadcopter-executing-command-vector-illustration_1284-66163.jpg", caption="Drone Project")
    
    with col2:
        st.markdown("""
        ### Overview
        Built a custom quadcopter drone equipped with environmental sensors for urban air quality monitoring and data collection.
        
        ### Challenge
        Developing a stable aerial platform that could carry environmental sensors while maintaining sufficient flight time and data transmission capabilities.
        
        ### Solution
        Created a custom drone with:
        - Lightweight carbon fiber frame for maximum payload capacity
        - Optimized battery and power management system
        - Environmental sensor array (PM2.5, CO2, temperature, humidity)
        - Real-time data transmission and mapping capabilities
        
        ### Key Contributions
        - Designed the drone's structural and electronic systems
        - Integrated the environmental sensor package
        - Developed the data collection and transmission software
        - Created visualization tools for the collected environmental data
        
        ### Results
        - Achieved 25-minute flight time with full sensor package
        - Successfully mapped air quality variations across campus
        - Data collected contributed to a university environmental study
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["Drone Design", "Arduino", "Environmental Sensors", "Data Visualization", "Wireless Communication", "Flight Control", "CAD", "3D Printing"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

# Tab 2: Research Projects
with project_tabs[1]:
    # Directory section
    st.markdown('<div class="directory-card">', unsafe_allow_html=True)
    st.markdown("### Directory")
    st.markdown("Navigate to specific projects:")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Project 1 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#hri-research" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Human-Robot Interaction Research</div>
                    <div class="directory-description">Research on natural interaction patterns between humans and social robots, published at HRI'2024.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
        # Project 2 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#ml-gesture" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Machine Learning for Gesture Recognition</div>
                    <div class="directory-description">Research on using deep learning to recognize and interpret human gestures for robot control.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
    
    with col2:
        # Project 3 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#vr-simulation" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">VR Simulation for Robot Training</div>
                    <div class="directory-description">Using virtual reality environments to train robotic systems before real-world deployment.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
        # Project 4 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#architecture-ai" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">AI in Architectural Design</div>
                    <div class="directory-description">Applying machine learning to architectural design problems for space optimization.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 1: HRI Research
    st.markdown('<div id="hri-research" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Human-Robot Interaction Research")
    st.markdown("**Duration:** January 2023 - June 2024")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/artificial-intelligence-concept-with-human-head-outline_23-2147850167.jpg", caption="HRI Research")
    
    with col2:
        st.markdown("""
        ### Overview
        Conducted research on natural interaction patterns between humans and social robots at Tsinghua University's Pervasive HCI Lab, resulting in a Late-Breaking Report published at the HRI'2024 conference.
        
        ### Research Question
        How can we design robot behaviors that feel natural and intuitive to human users without requiring explicit training or instruction?
        
        ### Methodology
        - Conducted user studies with 30+ participants of varying ages and technological familiarity
        - Used mixed-methods approach combining qualitative observations and quantitative metrics
        - Developed and tested multiple interaction prototypes with varying degrees of social expressivity
        - Analyzed data using statistical methods to identify significant patterns
        
        ### Key Contributions
        - Designed and conducted comprehensive user studies
        - Developed novel interaction frameworks based on human social psychology
        - Analyzed interaction data using rigorous statistical methods
        - Published findings in a peer-reviewed conference (HRI'2024)
        - Presented research to academic and industry audiences
        
        ### Results
        - Identified key behavioral patterns that significantly improved human-robot interaction quality
        - Demonstrated that subtle non-verbal cues can substantially enhance perceived robot intelligence
        - Created design guidelines for robot behavior that have been incorporated into our company's product development
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies and Methods used:**")
        skills = ["Python", "R", "Statistical Analysis", "Qualitative Research", "User Studies", "Prototype Development", "Literature Review"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Additional research projects in the Research tab:
    # Project 2: ML Gesture
    st.markdown('<div id="ml-gesture" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Machine Learning for Gesture Recognition")
    st.markdown("**Duration:** May 2022 - December 2022")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/gesture-recognition-abstract-concept-illustration_335657-3822.jpg", caption="Gesture Recognition")
    
    with col2:
        st.markdown("""
        ### Overview
        Researched and developed machine learning models for recognizing human gestures to enable more intuitive robot control interfaces.
        
        ### Research Question
        How can machine learning models effectively recognize complex hand gestures in real-time with sufficient accuracy for robot control applications?
        
        ### Methodology
        - Collected a dataset of 5,000+ gesture samples from 25 participants
        - Implemented several deep learning architectures (CNN, LSTM, Transformer)
        - Developed real-time processing pipeline with optimization for edge computing
        - Conducted comparative analysis of model performance across different metrics
        
        ### Key Contributions
        - Created a novel hybrid CNN-LSTM architecture optimized for gesture recognition
        - Developed data augmentation techniques for improved model generalization
        - Implemented real-time inference on resource-constrained platforms
        - Open-sourced the gesture dataset and baseline models
        
        ### Results
        - Achieved 94% accuracy in real-time gesture recognition
        - Reduced inference time to 15ms on embedded platforms
        - Successfully integrated with robot control systems for demonstration
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies and Methods used:**")
        skills = ["PyTorch", "TensorFlow", "Computer Vision", "Deep Learning", "Data Collection", "Real-time Processing", "Edge AI", "Model Optimization"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 3: VR Simulation
    st.markdown('<div id="vr-simulation" class="project-card">', unsafe_allow_html=True)
    st.markdown("## VR Simulation for Robot Training")
    st.markdown("**Duration:** September 2022 - April 2023")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/virtual-reality-concept-illustration_114360-2077.jpg", caption="VR Simulation")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed a virtual reality environment for training and testing robotic systems before deployment in real-world settings.
        
        ### Research Question
        Can VR simulations effectively bridge the reality gap to enable more efficient robot training and reduce physical prototyping time?
        
        ### Methodology
        - Created high-fidelity VR environments mimicking target deployment scenarios
        - Implemented physics-based simulation with accurate robot kinematics
        - Developed domain randomization techniques for robustness
        - Conducted comparative studies between VR-trained and traditionally-trained robots
        
        ### Key Contributions
        - Designed the VR environment and simulation framework
        - Implemented domain randomization techniques for sim-to-real transfer
        - Created a library of challenging scenarios for robot testing
        - Developed metrics for evaluating simulation fidelity
        
        ### Results
        - Reduced physical robot training time by 60%
        - Improved robot performance on novel tasks by 40%
        - Successfully transferred learned policies from simulation to real robots
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies and Methods used:**")
        skills = ["Unity3D", "C#", "VR Development", "Physics Simulation", "Robot Simulation", "Domain Randomization", "Reinforcement Learning", "Sim-to-Real Transfer"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 4: Architecture AI
    st.markdown('<div id="architecture-ai" class="project-card">', unsafe_allow_html=True)
    st.markdown("## AI in Architectural Design")
    st.markdown("**Duration:** January 2021 - June 2021")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/futuristic-architecture-blue-background-with-white-building-design_53876-119505.jpg", caption="Architecture AI")
    
    with col2:
        st.markdown("""
        ### Overview
        Applied machine learning techniques to architectural design problems, focusing on space optimization and workflow efficiency in building layouts.
        
        ### Research Question
        How can AI systems assist architects in optimizing spatial arrangements while respecting functional, aesthetic, and regulatory constraints?
        
        ### Methodology
        - Analyzed patterns in 200+ existing building designs
        - Developed generative models for suggesting spatial arrangements
        - Created constraint-based optimization algorithms for refining designs
        - Conducted user studies with practicing architects
        
        ### Key Contributions
        - Developed a novel representation of architectural spaces for machine learning
        - Created algorithms for optimizing spatial relationships based on usage patterns
        - Implemented interactive tools for architect-AI collaboration
        - Published findings in an architecture technology journal
        
        ### Results
        - Generated designs achieved 25% better space utilization
        - Architects reported 40% reduction in time spent on initial layout planning
        - Demonstrated successful integration of AI tools into existing design workflows
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies and Methods used:**")
        skills = ["Python", "TensorFlow", "Generative Models", "CAD Integration", "Constraint Programming", "User Interface Design", "Space Syntax Analysis", "Architecture Software"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

# Tab 3: Control System Projects
with project_tabs[2]:
    # Directory section
    st.markdown('<div class="directory-card">', unsafe_allow_html=True)
    st.markdown("### Directory")
    st.markdown("Navigate to specific projects:")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Project 1 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#quadcopter-control" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Quadcopter Control System</div>
                    <div class="directory-description">Development of a PID control system for stable quadcopter flight in varying conditions.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
        # Project 2 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#manipulator-system" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Robotic Manipulator Control</div>
                    <div class="directory-description">Precision control system for a 6-DOF robotic arm using inverse kinematics and path planning.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
    
    with col2:
        # Project 3 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#distributed-control" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Distributed Control Network</div>
                    <div class="directory-description">Multi-node control network for coordinating swarm robots with real-time feedback.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
        # Project 4 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#self-balancing" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Self-Balancing Robot</div>
                    <div class="directory-description">Two-wheeled robot with dynamic balance control using sensor fusion and state estimation.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 1: Quadcopter Control System
    st.markdown('<div id="quadcopter-control" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Quadcopter Control System")
    st.markdown("**Duration:** March 2022 - December 2022")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/quadcopter-concept-illustration_114360-1025.jpg", caption="Quadcopter Control System")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed a PID control system for stable quadcopter flight in varying conditions as part of a university project team.
        
        ### Challenge
        Creating a control system that could handle different flight scenarios and maintain stability.
        
        ### Solution
        We developed a system featuring:
        - PID controller for altitude, roll, pitch, and yaw control
        - IMU sensor for feedback and state estimation
        - Microcontroller for executing control commands
        - Communication with ground station for remote monitoring
        
        ### Key Contributions
        - Designed the control algorithm for stable flight
        - Implemented IMU sensor integration
        - Created a microcontroller for executing control commands
        - Developed communication protocols for remote monitoring
        
        ### Results
        - Successfully achieved stable flight in various conditions
        - Reduced energy consumption in the test environment by 20% through smart automation
        - Received university innovation award for practical application
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["Python", "PID Control", "IMU Sensor", "Microcontroller", "Communication", "Flight Control", "CAD", "3D Printing"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 2: Robotic Manipulator Control
    st.markdown('<div id="manipulator-system" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Robotic Manipulator Control")
    st.markdown("**Duration:** May 2023 - December 2023")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/robot-arm-industrial-white-background_36367-76.jpg", caption="Robotic Manipulator Control")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed a precision control system for a 6-DOF robotic arm using inverse kinematics and path planning.
        
        ### Challenge
        Creating a system that could accurately control the arm's position and orientation while maintaining sufficient payload capacity.
        
        ### Solution
        Implemented a system featuring:
        - Inverse kinematics for position control
        - Path planning for trajectory generation
        - Custom control PCB with Arduino integration
        - ROS-based software for programming and communication
        
        ### Key Contributions
        - Designed the control algorithm for accurate position control
        - Implemented path planning for trajectory generation
        - Created a custom control PCB for Arduino integration
        - Developed ROS-based communication protocols
        
        ### Results
        - Achieved 0.5mm positioning accuracy
        - Successfully implemented in undergraduate robotics courses
        - Used by 3 research groups for various manipulation experiments
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["ROS", "C++", "Arduino", "CAD", "3D Printing", "PCB Design", "Servo Control", "Inverse Kinematics"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 3: Distributed Control Network
    st.markdown('<div id="distributed-control" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Distributed Control Network")
    st.markdown("**Duration:** January 2022 - June 2022")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/swarm-robots-concept-illustration_114360-2077.jpg", caption="Distributed Control Network")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed a multi-node control network for coordinating swarm robots with real-time feedback.
        
        ### Challenge
        Creating a system that could coordinate multiple robots in a distributed manner while maintaining synchronization and stability.
        
        ### Solution
        Implemented a system featuring:
        - Centralized control hub based on Raspberry Pi
        - Distributed control nodes for robot coordination
        - Communication protocols for data exchange and synchronization
        - Real-time feedback system for robot state monitoring
        
        ### Key Contributions
        - Designed the system architecture for distributed control
        - Implemented the centralized control hub using Raspberry Pi
        - Developed communication protocols for data exchange and synchronization
        - Created a real-time feedback system for robot state monitoring
        
        ### Results
        - Successfully coordinated 10+ robots in distributed scenarios
        - Reduced synchronization time by 50% through optimized communication protocols
        - Demonstrated at a university technology showcase
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["Python", "ROS", "Raspberry Pi", "Communication", "Real-time Feedback", "Swarm Robotics", "CAD", "3D Printing"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 4: Self-Balancing Robot
    st.markdown('<div id="self-balancing" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Self-Balancing Robot")
    st.markdown("**Duration:** April 2021 - November 2021")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/self-balancing-robot-concept-illustration_114360-1525.jpg", caption="Self-Balancing Robot")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed a two-wheeled robot with dynamic balance control using sensor fusion and state estimation.
        
        ### Challenge
        Creating a robot that could maintain balance while moving, without relying on external guidance or support.
        
        ### Solution
        Implemented a system featuring:
        - IMU sensor for state estimation and feedback
        - PID controller for balance control
        - Microcontroller for executing control commands
        - Real-time feedback system for robot state monitoring
        
        ### Key Contributions
        - Designed the control algorithm for dynamic balance
        - Implemented IMU sensor integration
        - Created a microcontroller for executing control commands
        - Developed a real-time feedback system for robot state monitoring
        
        ### Results
        - Successfully achieved dynamic balance in various scenarios
        - Reduced energy consumption in the test environment by 30% through smart automation
        - Received university innovation award for practical application
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["IMU Sensor", "PID Controller", "Microcontroller", "Real-time Feedback", "Sensor Fusion", "State Estimation", "CAD", "3D Printing"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

# Tab 4: Software Development Projects
with project_tabs[3]:
    # Directory section
    st.markdown('<div class="directory-card">', unsafe_allow_html=True)
    st.markdown("### Directory")
    st.markdown("Navigate to specific projects:")
    
    col1, col2 = st.columns(2)
    
    with col1:
        # Project 1 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#smart-home" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Smart Home Automation System</div>
                    <div class="directory-description">A comprehensive system integrating IoT devices for home automation and control.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
        # Project 2 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#mobile-app" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Cross-Platform Mobile Application</div>
                    <div class="directory-description">A Flutter-based mobile app for health monitoring and fitness tracking.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
    
    with col2:
        # Project 3 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#web-platform" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">Educational Web Platform</div>
                    <div class="directory-description">An interactive web platform for online learning and educational content delivery.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
        
        # Project 4 directory item
        st.markdown(
            f"""
            <div class="directory-item">
                <a href="#ar-app" style="text-decoration: none; color: inherit;">
                    <div class="directory-title">AR Navigation Application</div>
                    <div class="directory-description">An augmented reality app for indoor navigation and information overlay.</div>
                </a>
            </div>
            """, 
            unsafe_allow_html=True
        )
    
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 1: Smart Home Automation System
    st.markdown('<div id="smart-home" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Smart Home Automation System")
    st.markdown("**Duration:** January 2023 - Present")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/smart-home-concept-illustration_114360-1025.jpg", caption="Smart Home Automation System")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed a comprehensive system integrating IoT devices for home automation and control.
        
        ### Challenge
        Creating a system that could handle various automation tasks and provide a seamless user experience.
        
        ### Solution
        We developed a system featuring:
        - IoT device integration for various home automation tasks
        - Cloud-based control and monitoring platform
        - Voice control integration using natural language processing
        - Customizable automation rules and schedules
        
        ### Key Contributions
        - Designed the system architecture for IoT device integration
        - Developed a cloud-based control platform
        - Implemented voice control integration using NLP
        - Created customizable automation rules and schedules
        
        ### Results
        - Successfully automated various home tasks
        - Provided a seamless user experience through voice control
        - Reduced energy consumption in the home environment
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["Python", "IoT", "Cloud Platform", "Natural Language Processing", "Voice Control", "Automation", "CAD", "3D Printing"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 2: Cross-Platform Mobile Application
    st.markdown('<div id="mobile-app" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Cross-Platform Mobile Application")
    st.markdown("**Duration:** February 2023 - Present")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/mobile-app-concept-illustration_114360-1025.jpg", caption="Cross-Platform Mobile Application")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed a Flutter-based mobile app for health monitoring and fitness tracking.
        
        ### Challenge
        Creating a mobile app that could be used on multiple platforms (iOS, Android) while maintaining a consistent user experience.
        
        ### Solution
        We developed a mobile app featuring:
        - Cross-platform compatibility for iOS and Android
        - Health monitoring features for users
        - Fitness tracking capabilities
        - Customizable user profiles and goals
        
        ### Key Contributions
        - Designed the app architecture for cross-platform compatibility
        - Developed health monitoring and fitness tracking features
        - Implemented user profiles and goal setting functionality
        - Created a consistent user experience across platforms
        
        ### Results
        - Successfully launched the app on both iOS and Android platforms
        - Received positive user feedback for health monitoring and fitness tracking features
        - Reduced user friction through consistent user experience
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["Flutter", "Dart", "Health Monitoring", "Fitness Tracking", "Cross-Platform", "User Profiles", "CAD", "3D Printing"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 3: Educational Web Platform
    st.markdown('<div id="web-platform" class="project-card">', unsafe_allow_html=True)
    st.markdown("## Educational Web Platform")
    st.markdown("**Duration:** January 2023 - Present")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/web-platform-concept-illustration_114360-1025.jpg", caption="Educational Web Platform")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed an interactive web platform for online learning and educational content delivery.
        
        ### Challenge
        Creating a platform that could provide engaging and interactive learning experiences for users.
        
        ### Solution
        We developed a platform featuring:
        - Interactive learning modules for various subjects
        - Customizable learning paths for users
        - Progress tracking and certification features
        - Community interaction and collaboration tools
        
        ### Key Contributions
        - Designed the platform architecture for scalable content delivery
        - Developed interactive learning modules for various subjects
        - Implemented custom learning paths and certification features
        - Created community interaction and collaboration tools
        
        ### Results
        - Successfully launched the platform for online learning
        - Received positive user feedback for interactive learning experiences
        - Reduced user friction through consistent platform experience
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["React", "Node.js", "MongoDB", "Web Development", "Interactive Learning", "Community Interaction", "CAD", "3D Printing"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    # Project 4: AR Navigation Application
    st.markdown('<div id="ar-app" class="project-card">', unsafe_allow_html=True)
    st.markdown("## AR Navigation Application")
    st.markdown("**Duration:** January 2023 - Present")
    
    col1, col2 = st.columns([1, 2])
    with col1:
        st.image("https://img.freepik.com/free-vector/ar-app-concept-illustration_114360-1025.jpg", caption="AR Navigation Application")
    
    with col2:
        st.markdown("""
        ### Overview
        Developed an augmented reality app for indoor navigation and information overlay.
        
        ### Challenge
        Creating an app that could provide accurate indoor navigation and information overlay.
        
        ### Solution
        We developed an app featuring:
        - Indoor navigation using AR technology
        - Information overlay for points of interest
        - Customizable route planning and navigation
        - User-friendly interface for seamless navigation
        
        ### Key Contributions
        - Designed the app architecture for AR technology integration
        - Developed indoor navigation features
        - Implemented information overlay for points of interest
        - Created customizable route planning and navigation
        
        ### Results
        - Successfully launched the app for indoor navigation
        - Received positive user feedback for accurate navigation and information overlay
        - Reduced user friction through seamless navigation experience
        """)
        
        st.markdown('<div class="skills-container">', unsafe_allow_html=True)
        st.markdown("**Technologies used:**")
        skills = ["Unity", "ARKit", "ARCore", "Information Overlay", "Route Planning", "User Interface", "CAD", "3D Printing"]
        
        # 将技能分成多列显示
        cols = st.columns(4)  # 创建4列
        for i, skill in enumerate(skills):
            with cols[i % 4]:  # 循环使用这4列
                st.markdown(f"<div style='background-color: #E2E8F0; padding: 4px 8px; border-radius: 15px; font-size: 0.85rem; color: #1E3A8A; margin-bottom: 8px; text-align: center;'>{skill}</div>", unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)

# Additional info
st.markdown('<h2 class="section-header">More Projects</h2>', unsafe_allow_html=True)
st.write("These are just a few highlights of my work. I'm always working on new projects and exploring new technologies.")
st.write("If you'd like to discuss any of these projects in more detail or explore potential collaborations, please feel free to contact me through the Contact page.")

# GitHub link
st.markdown("### Check out my code")
st.markdown("You can explore more of my projects and code samples on my [GitHub profile](https://github.com).")

# Add JavaScript for smooth scrolling
st.markdown("""
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Fix for clicking on directory items
    document.querySelectorAll('.directory-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const targetId = this.getAttribute('onclick').match(/document.getElementById\\('(.*?)'\\)/)[1];
            document.getElementById(targetId).scrollIntoView({behavior: 'smooth'});
        });
    });
});
</script>
""", unsafe_allow_html=True)