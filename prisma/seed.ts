import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// My actual project data
const projectsData = [
  {
    title: 'Credit Card Rewards Calculator',
    description: 'A Laravel-based web application that helps users optimize their credit card selection by calculating potential annual rewards based on their spending habits. Features intelligent recommendation algorithms, email notifications, and support for both cash back and points-based reward systems.',
    featured: false,
    imageSrc: '/images/rewards-calculator.jpg',
    technologies: [
      { name: 'Laravel 11' },
      { name: 'PHP 8.2+' },
      { name: 'TailwindCSS' },
      { name: 'AlpineJS' },
      { name: 'MySQL' },
      { name: 'Blade Templates' }
    ],
    githubLink: 'https://github.com/JKM1990/lara-cards',
    liveLink: '#',
    details: {
      problem: 'Consumers struggle to choose the optimal credit card from hundreds of options, often missing out on significant annual rewards by not matching their spending patterns to the best reward structures.',
      solution: 'Built an intelligent calculator that analyzes user spending across categories (groceries, gas, bills, other) and recommends the highest-earning credit card after factoring in annual fees, with automated email notifications for convenience.',
      challenges: [
        'Implementing flexible reward calculation strategies for both cash back and points systems',
        'Creating a scalable architecture using Strategy and Factory design patterns',
        'Building comprehensive email notification system with spending breakdowns',
        'Developing role-based access control for credit card management',
        'Ensuring accurate financial calculations with proper fee deductions'
      ]
    }
  },
  {
    title: 'Double-Headed Drilling Machine Control System',
    description: 'Designed and implemented a complete control system for a double-headed drilling machine during a 5-week work experience at Cripps and Sons, using Arduino Mega 2560 and Nextion touch screen interface. The company needed a reliable control system for their double-headed drilling machine that could be precisely controlled through an intuitive interface.',
    featured: true,
    imageSrc: '/images/drilling-machine.jpg',
    technologies: [
      { name: 'Arduino' },
      { name: 'C++' },
      { name: 'Nextion HMI' },
      { name: 'Electronical Engineering' },
      { name: 'Embedded Systems' }
    ],
    githubLink: undefined,
    liveLink: 'https://crippsandsons.grandway.ca/',
    details: {
      problem: 'The company needed a reliable control system for their double-headed drilling machine that could be precisely controlled through an intuitive interface.',
      solution: 'Developed a comprehensive control system using Arduino Mega 2560 and Nextion touch screen, with custom code to manage all machine operations.',
      challenges: [
        'Learning microcontroller programming with minimal prior experience',
        'Implementing complex wiring for 8 stepper motors and 16 limit switches',
        'Designing an intuitive touch interface for machine operators',
        'Ensuring fail-safe operation with proper emergency stop functionality'
      ]
    }
  },
  {
    title: 'Weyland-Yutani Claims Management System',
    description: 'A Next.js-based enterprise expense claims management platform that streamlines the employee reimbursement process. Features role-based access control, automated approval workflows, comprehensive reporting with data visualization, and secure file upload capabilities for receipt management.',
    featured: true,
    imageSrc: '/images/wy-reports.png',
    imageSrc2: '/images/wy-sa.png',
    technologies: [
      { name: 'Next.js 15' },
      { name: 'TypeScript' },
      { name: 'NextAuth.js' },
      { name: 'MySQL' },
      { name: 'TailwindCSS' },
      { name: 'Chart.js' }
    ],
    githubLink: 'https://github.com/JKM1990/wey-yut-ecs',
    liveLink: undefined,
    details: {
      problem: 'Organizations struggle with inefficient expense claim processes involving manual paperwork, slow approval cycles, and lack of spending visibility, leading to delayed reimbursements and poor financial tracking.',
      solution: 'Built a comprehensive web-based claims management system with automated workflows, role-based permissions (Employee/Admin/Super Admin), real-time dashboard analytics, and integrated reporting tools that streamline the entire claims lifecycle from submission to approval.',
      challenges: [
        'Implementing secure three-tier role-based access control with proper permission boundaries',
        'Creating flexible approval workflows that handle claim routing and status management',
        'Building comprehensive reporting system with Chart.js for spending trend visualization',
        'Developing secure file upload functionality for receipt attachments with proper validation',
        'Designing scalable database architecture supporting claims, users, and category management',
        'Integrating email notifications for password resets and workflow updates'
      ]
    }
  }
];

// Skills based on my actual projects
const skillsData = [
  { name: 'JavaScript (ES6+)', icon: 'fa-js' },
  { name: 'TypeScript', icon: 'fa-code' },
  { name: 'React', icon: 'fa-react' },
  { name: 'Next.js', icon: 'fa-react' },
  { name: 'Node.js', icon: 'fa-node-js' },
  { name: 'Laravel', icon: 'fa-laravel' },
  { name: 'PHP', icon: 'fa-php' },
  { name: 'TailwindCSS', icon: 'fa-css3' },
  { name: 'MySQL', icon: 'fa-database' },
  { name: 'MongoDB', icon: 'fa-database' },
  { name: 'Chart.js', icon: 'fa-chart-bar' },
  { name: 'C++', icon: 'fa-code' },
  { name: 'Arduino', icon: 'fa-microchip' },
  { name: 'Embedded Systems', icon: 'fa-microchip' },
  { name: 'Git/GitHub', icon: 'fa-git-alt' }
];

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.technology.deleteMany();
  await prisma.projectDetails.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();

  console.log('Cleared existing data');

  // Seed skills
  const skills = await Promise.all(
    skillsData.map(skill =>
      prisma.skill.create({
        data: {
          name: skill.name,
          icon: skill.icon
        }
      })
    )
  );

  console.log(`Created ${skills.length} skills`);

  // Seed projects
  for (const projectData of projectsData) {
    const { technologies, details, ...projectInfo } = projectData;

    // Create project with nested technologies and details
    await prisma.project.create({
      data: {
        ...projectInfo,
        technologies: {
          create: technologies.map(tech => ({
            name: tech.name
          }))
        },
        details: details ? {
          create: {
            problem: details.problem,
            solution: details.solution,
            challenges: details.challenges || []
          }
        } : undefined
      }
    });
  }

  console.log(`Created ${projectsData.length} projects`);
  console.log('Seed completed successfully!');
}

main()
  .catch(e => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });