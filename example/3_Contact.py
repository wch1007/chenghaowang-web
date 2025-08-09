import streamlit as st
import os

# Page configuration
st.set_page_config(
    page_title="Contact | Chenghao Wang - Portfolio",
    page_icon="📧",
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
        .contact-card {
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 20px;
            background-color: #f8f9fa;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .contact-info {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
        }
        .contact-icon {
            color: #1E3A8A;
            font-size: 1.5rem;
            margin-right: 0.5rem;
            vertical-align: middle;
        }
        .social-links {
            margin-top: 2rem;
            text-align: center;
        }
        .social-button {
            display: inline-block;
            background-color: #f1f5f9;
            padding: 10px 15px;
            margin: 0 10px 10px 0;
            border-radius: 5px;
            color: #1E3A8A;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
        }
        .social-button:hover {
            background-color: #1E3A8A;
            color: white;
            transform: translateY(-3px);
        }
        .map-container {
            margin-top: 2rem;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .submit-button {
            background-color: #1E3A8A;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .submit-button:hover {
            background-color: #1E40AF;
            transform: translateY(-2px);
        }
        .form-container input, .form-container textarea {
            border-radius: 5px;
            border: 1px solid #e2e8f0;
            padding: 10px;
            margin-bottom: 15px;
            width: 100%;
        }
        .form-container textarea {
            min-height: 150px;
        }
    </style>
    """, unsafe_allow_html=True)

local_css()

# Page header
st.markdown('<h1 class="section-header">Contact Me</h1>', unsafe_allow_html=True)
st.write("I'd love to hear from you! Whether you have a question, project idea, or job opportunity, feel free to reach out.")

# Contact information and form in two columns
col1, col2 = st.columns([1, 1])

with col1:
    st.markdown('<div class="contact-card">', unsafe_allow_html=True)
    st.markdown("### Get in Touch")
    
    st.markdown('<p class="contact-info">📞 <strong>Phone:</strong> (+1) 425-436-4595 / (+86) 185-0128-4401</p>', unsafe_allow_html=True)
    st.markdown('<p class="contact-info">✉️ <strong>Email:</strong> wch1007@uw.edu / 18501284401@163.com</p>', unsafe_allow_html=True)
    st.markdown('<p class="contact-info">🏠 <strong>Address:</strong> 818 132nd NE AVE, Bellevue, WA</p>', unsafe_allow_html=True)
    
    st.markdown("### Connect with Me")
    st.markdown('<div class="social-links">', unsafe_allow_html=True)
    st.markdown('<a href="https://www.linkedin.com/in/chenghao-wang-caelen" class="social-button">LinkedIn</a>', unsafe_allow_html=True)
    st.markdown('<span class="social-button">WeChat: wch18501284401</span>', unsafe_allow_html=True)
    st.markdown('<a href="https://github.com" class="social-button">GitHub</a>', unsafe_allow_html=True)
    st.markdown('<a href="https://twitter.com" class="social-button">Twitter</a>', unsafe_allow_html=True)
    st.markdown('<a href="https://medium.com" class="social-button">Medium</a>', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    st.markdown("### Office Hours")
    st.markdown("""
    I'm generally available for meetings (in-person or virtual) during the following hours:
    
    - **Monday - Friday:** 9:00 AM - 5:00 PM (Pacific Time)
    - **Saturday:** By appointment
    
    Please email me to schedule a specific time.
    """)
    st.markdown('</div>', unsafe_allow_html=True)

with col2:
    st.markdown('<div class="contact-card form-container">', unsafe_allow_html=True)
    st.markdown("### Send Me a Message")
    
    # Contact form
    with st.form("contact_form"):
        name = st.text_input("Name*")
        email = st.text_input("Email*")
        subject = st.text_input("Subject*")
        message = st.text_area("Message*")
        
        submitted = st.form_submit_button("Send Message", use_container_width=True)
        if submitted:
            if name and email and subject and message:
                st.success("Thank you for your message! I'll get back to you soon.")
            else:
                st.error("Please fill in all required fields.")
    
    st.markdown("*Your information will never be shared with third parties.*")
    st.markdown('</div>', unsafe_allow_html=True)

# Location map
st.markdown('<h2 class="section-header">My Location</h2>', unsafe_allow_html=True)
st.markdown('<div class="map-container">', unsafe_allow_html=True)
st.markdown("""
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.3261862126046!2d-122.16699892382183!3d47.63091628952446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906c1e28d06265%3A0xbb6915939ab3de70!2sBellevue%2C%20WA!5e0!3m2!1sen!2sus!4v1682373636175!5m2!1sen!2sus" 
width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
""", unsafe_allow_html=True)
st.markdown('</div>', unsafe_allow_html=True)

# FAQ Section
st.markdown('<h2 class="section-header">Frequently Asked Questions</h2>', unsafe_allow_html=True)
faq_expander1 = st.expander("What is the best way to contact you for urgent matters?")
with faq_expander1:
    st.write("For urgent matters, email is the fastest way to reach me. I check my email regularly throughout the day and typically respond within a few hours during business days.")

faq_expander2 = st.expander("Are you available for freelance or consulting work?")
with faq_expander2:
    st.write("Yes, I'm open to freelance and consulting opportunities, particularly in the areas of robotics, product development, and HCI research. Please contact me with details about your project for further discussion.")


faq_expander3 = st.expander("Are you open to relocation for the right opportunity?")
with faq_expander3:
    st.write("While I'm currently based in Bellevue, WA, I'm open to relocation for exceptional opportunities, particularly in tech hubs around the United States or in China (Beijing, Shanghai, Guangzhou, Shenzhen). Remote work arrangements are also welcome.")