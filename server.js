const express = require('express');
const cors = require('cors')
const app = express()
const db = require('./models/index')
const adminRoutes = require('./routes/adminRoutes');
const navbarRoutes = require('./routes/navbarRoutes');
const footerRouter = require('./routes/footerRoutes');
const contentRoutes = require('./routes/contentRoutes');
const consultanRoutes = require('./routes/consultanRoutes');
const ourValuesRouter = require('./routes/ourValuesRouter');
const headerContentRoutes = require('./routes/headerContentRoutes');
const challengeAndImpactRouters = require('./routes/challengeAndImpactRouter');
const redis = require('redis');
// const { responseGenerator } = require('./helper/functions.helper');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

client.connect();

app.use(express.json());
app.use('/imageuploads', express.static('uploads'));
app.use(cors())


const PORT = process.env.PORT || 8001;

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/headercontent', headerContentRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/challengeAndImpact', challengeAndImpactRouters);
app.use('/api/v1/consultanform', consultanRoutes);
app.use('/api/v1/ourvalues', ourValuesRouter);
app.use('/api/v1/navbar', navbarRoutes);
app.use('/api/v1/footer', footerRouter);


app.get('/', (req,res)=>{
    res.send('Hello World!')
})

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    console.log(error);
    return res.status(statusCode).json({ message: error.message, statusCode: statusCode });
    // return responseGenerator(res, err, message, statusCode, false)
    // return responseGen(res, error.message, statusCode);
});

db.sequelize.authenticate()
    .then(() => console.log(''))
    .catch((err) => console.log('Database connection error : ' + err));

app.listen(PORT, () => {
    console.log(`server running way........ ${PORT}`);
})

// const navabar = {
//     id: 1,
//     logo: "/compny_logo",
//     href: "/creere_us",
//     label: "creere with us ",
//     links: [
//         {
//             id: 1,
//             title: 'Home',
//             href: '/home',
//             logo: '/images/home.png',
//             subLinks: []
//         },
//         {
//             id: 2,
//             title: 'Company',
//             link: '/company',
//             link_list: [
//                 { id: 1, text: "Mobile app development" },
//                 { id: 2, text: "Website Development" },
//                 { id: 3, text: "E-commerce Development" },
//                 { id: 4, text: "Custom Software Development" },
//                 { id: 5, text: "Bespoke Development" },
//                 { id: 6, text: "CRM Solutions" }
//             ],
//             subLinks: [
//                 {
//                     id: 1,
//                     title: 'Design developement',
//                     href: '/solution/design_development',
//                     image: '/images/team.png',
//                     sublink_list: [
//                         { id: 1, text: "Mobile app development" },
//                         { id: 2, text: "Website Development" },
//                         { id: 3, text: "UI & Ux Figma Design" }
//                     ]
//                 },
//                 {
//                     id: 2,
//                     title: 'Digital marketing',
//                     link: '/solution/digital_marketing',
//                     image: '/images/team.png',
//                     link_list: [
//                         { id: 1, text: "SEO Service" },
//                         { id: 2, text: "SMM Service" },
//                         { id: 3, text: "Paid Media" },
//                         { id: 4, text: "Email Marketing" },
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: 'Custom software solution',
//                     link: '/solution/custom',
//                     image: '/images/team.png',
//                     link_list: [
//                         { id: 1, text: "Mobile app developement" },
//                         { id: 2, text: "Designs" },
//                         { id: 3, text: "Digital Marketing" },
//                         { id: 4, text: "Software Development" },
//                     ]
//                 },
//                 {
//                     id: 3,
//                     title: 'Support services',
//                     link: '/solution/support',
//                     image: '/images/team.png',
//                     link_list: [
//                         { id: 1, text: "Mobile app developement" },
//                         { id: 2, text: "Designs" },
//                         { id: 3, text: "Digital Marketing" },
//                         { id: 4, text: "Software Development" },
//                     ]
//                 },
//             ]
//         },
//         {
//             id: 3,
//             title: 'Expertise',
//             link: '/expertise',
//             logo: '/images/home.png',
//             link_list: [
//                 { id: 1, text: "Mobile app development" },
//                 { id: 2, text: "Website Development" },
//                 { id: 3, text: "E-commerce Development" },
//                 { id: 4, text: "Custom Software Development" },
//                 { id: 5, text: "Bespoke Development" },
//                 { id: 6, text: "CRM Solutions" }
//             ],
//             subLinks: [
//                 {
//                     id: 1,
//                     title: 'helathcare',
//                     link: '/company/design_development',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 2,
//                     title: 'Education',
//                     link: '/company/design_development',
//                     image: '/images/team.png',
//                 },
//                 // and more ..
//             ]
//         },
//         {
//             id: 4,
//             title: 'Industry',
//             link: '/industry',
//             text: '/images/home.png',
//             link_list: [
//                 { id: 1, text: "Mobile app development" },
//                 { id: 2, text: "Website Development" },
//                 { id: 3, text: "E-commerce Development" },
//                 { id: 4, text: "Custom Software Development" },
//                 { id: 5, text: "Bespoke Development" },
//                 { id: 6, text: "CRM Solutions" }
//             ],
//             subLinks: [
//                 {
//                     id: 1,
//                     title: 'Healthcare',
//                     link: '/company/design_development',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 2,
//                     title: 'Education',
//                     link: '/company/design_development',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 3,
//                     title: 'E-commerce',
//                     link: '/company/ecommerce',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 4,
//                     title: 'Real-estate',
//                     link: '/company/real_estate',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 5,
//                     title: 'Logistics',
//                     link: '/company/logistics',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 6,
//                     title: 'Chatbot and AI',
//                     link: '/company/chatbot_ai',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 7,
//                     title: 'Entertainment and Social Media',
//                     link: '/company/entertainment',
//                     image: '/images/team.png',
//                 },
//             ]
//         },
//         {
//             id: 5,
//             title: 'Case Study',
//             link: '/caseStudy',
//             text: ' If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay',
//             subLinks: [
//                 {
//                     id: 1,
//                     title: 'E-learning & Education',
//                     link: '/caseStudy/elearning',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 2,
//                     title: 'Healthcare & Life style',
//                     link: '/caseStudy/healthcare',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 3,
//                     title: 'Real E-state',
//                     link: '/caseStudy/e_state',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 4,
//                     title: 'Tour & Travels',
//                     link: '/caseStudy/travels',
//                     image: '/images/team.png',
//                 },
//                 {
//                     id: 5,
//                     title: 'Retail $ E-commerce',
//                     link: '/caseStudy/retail',
//                     image: '/images/team.png',
//                 },
//             ]
//         },
//         {
//             id: 6,
//             title: 'Reach us',
//             link: '/reachUs',
//             text: '/images/home.png',
//         }
//     ]
// }

// let navigations = {
//     navigation_menu: [
//         { id: 1, label: "Home", href: "/home" },
//         { id: 2, label: "All Experts", href: "/all_experts" },
//         { id: 3, label: "StrtegicMarketing", href: "/home" },
//         // ... and more
//     ],
//     linkId: 1,
//     sectionId: 2
// }

// let headerContent = {
//     title: "",
//     subtitle: "",
//     navigation_menu: [
//         {
//             id: 1,
//             title: 'Healthcare',
//             href: '/company/design_development',
//             image: '/images/team.png',
//         },
//         {
//             id: 2,
//             title: 'Education',
//             href: '/company/design_development',
//             image: '/images/team.png',
//         },
//         {
//             id: 3,
//             title: 'E-commerce',
//             href: '/company/ecommerce',
//             image: '/images/team.png',
//         },
//         {
//             id: 4,
//             title: 'Real-estate',
//             href: '/company/real_estate',
//             image: '/images/team.png',
//         },
//     ],
//     logoId: [
//         {
//             id: 1,
//             label: "",
//             href: ""
//         },
//         {
//             id: 2,
//             label: "",
//             href: ""
//         }
//     ],
//     text: "",
//     body: "",
//     label: "",
//     href: ""
// }

// let footer = {
//     title: "@ Copyright iWebwiser 2023",
//     footerlinks: [
//         { title: "About us ", href: "/about_us" },
//         { title: "Career ", href: "/career" },
//         { title: "Success story ", href: "/success_story" },
//         { title: "Privacy policay", href: "/privacy_policay" },
//         { title: "Terms of use", href: "/terms_use" },
//         // add more footerLinks...........
//     ],
//     socialMedia: [
//         {
//             title: "socialMedia",
//             companiesLogo: [
//                 { logo: "Teach Behemoths", href: "/teach_behemoths" }
//                 // add more companiesLogo .....
//             ],
//             media: [
//                 { title: "Linkedin", href: "/linkedin", logo: "Linkedin" },
//                 { title: "Instargram", href: "/Instargram", logo: "Instargram" },
//                 { title: "Facebook", href: "/facebook", logo: "Facebook" },
//                 { title: "Twitter", href: "/twitter", logo: "Twitter" },
//                 { title: "Dribole", href: "/dribole", logo: "Dribole" },
//                 // add more media .. 
//             ]
//         }
//     ],
//     branches: [
//         {
//             title: "Globle branches",
//             branche: [
//                 { name: "iWebwiser", address: "Usa", status: "Active" },
//                 { name: "Appwise", address: "Usa", status: "Active" },
//                 { name: "NewWay", address: "Usa", status: "Active" },
//                 { name: "iWebwiser", address: "Usa", status: "Active" },
//                 // add more branche ....... 
//             ]
//         },
//         {
//             title: "India branches",
//             branch: [
//                 { name: "iWebwiser", address: "Usa", status: "Active" },
//                 { name: "Appwise", address: "Usa", status: "Active" },
//                 { name: "NewWay", address: "Usa", status: "Active" },
//                 { name: "iWebwiser", address: "Usa", status: "Active" },
//                 // add more branche ....... 
//             ]
//         }
//         // add more braches ......... 
//     ]
// }

