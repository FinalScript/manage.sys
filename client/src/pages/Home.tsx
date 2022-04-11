import React, { useEffect } from 'react';
import heroSVG from '../assets/images/undraw_hire.svg';

const teamData = [
    {
        name: 'Roynul Rohan',
        title: 'Lead Developer , Project Manager',
        description:
            'Software architecture & design, management of issues & features, ensuring quality of development & product, and in charge of DevOps and IT operations.',
        linkedIn: 'https://www.linkedin.com/in/roynul-rohan/',
        github: 'https://github.com/roynulrohan',
        img: 'https://avatars.githubusercontent.com/u/43069448?v=4',
    },
    {
        name: 'Mohammed Abdulla',
        title: 'Software Developer , UI/UX',
        description:
            'Developing software products, integrating business logic, data layers and solutions. Responsible for functionality and intended use, ensuring the best end user experience.',
        linkedIn: 'https://www.linkedin.com/in/mohammed-abdulla-b5281b19a/',
        github: 'https://github.com/moe1011',
        img: 'https://avatars.githubusercontent.com/u/77053716?v=4',
    },
    {
        name: 'Bakr Matlab',
        title: 'Software Developer , Business Analyst',
        description:
            'Integrations of features on both front-end and back-end. Translating business needs into requirements and oversees all other business operations.',
        linkedIn: 'https://ca.linkedin.com/in/bakr-matlab-04a2a0197',
        github: 'https://github.com/bakrmatlab',
        img: 'https://avatars.githubusercontent.com/u/58094830?v=4',
    },
];

export const Home = () => {
    useEffect(() => {
        document.title = 'Home | Manage.sys';
    }, []);

    return (
        <div className='h-full bg-white dark:bg-gray-800 text-white'>
            <section className='text-gray-500 dark:text-gray-400 body-font h-screen flex items-center'>
                <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
                    <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10'>
                        <img className='object-cover object-center rounded' alt='hero' src={heroSVG} />
                    </div>
                    <div className='lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'>
                        <h1 className='mb-5 title-font sm:text-5xl text-3xl font-medium text-gray-900 dark:text-white'>
                            The only management system,
                            <span className='mt-3 block'>you need.</span>
                        </h1>
                        <p className='mb-8 leading-relaxed'>
                            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park
                            mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.
                        </p>
                        <div className='flex justify-center'>
                            <button className='inline-flex text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none hover:bg-pink-800 rounded text-lg'>
                                Button
                            </button>
                            <button className='ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg'>
                                Button
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='text-gray-500 dark:text-gray-400  body-font'>
                <div className='container px-5 py-24 mx-auto'>
                    <div className='flex flex-col text-center w-full mb-12'>
                        <h1 className='text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white'>OUR TEAM</h1>
                        <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
                            A group of aspiring and young developers looking to provide impactful services and applications.
                        </p>
                    </div>
                    <div className='flex flex-wrap justify-center -m-4'>
                        {teamData.map((member) => {
                            return (
                                <div key={member.name} className='p-4 lg:w-1/4 md:w-1/2'>
                                    <div className='h-full flex flex-col items-center text-center'>
                                        <img alt='team' className='flex-shrink-0 rounded-lg w-full h-72 object-cover object-center mb-4' src={member.img} />
                                        <div className='w-full flex flex-col items-center justify-between h-72'>
                                            <h2 className='title-font font-semibold text-lg text-gray-900 dark:text-white'>{member.name}</h2>
                                            <h3 className='text-pink-500 mb-2 flex items-center'>{member.title}</h3>
                                            <p className='mb-4 text-left flex items-center'>{member.description}</p>
                                            <div className='pb-4 pt-1 w-24'>
                                                <div className='w-full border-t border-gray-300'></div>
                                            </div>
                                            <span className='inline-flex'>
                                                <a href={member.linkedIn} target='_blank' rel='noopener noreferrer' className='text-gray-900 dark:text-gray-100 cursor-pointer'>
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' width='26' height='26' viewBox='0 0 24 24'>
                                                        <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                                                    </svg>
                                                </a>
                                                <a href={member.github} target='_blank' rel='noopener noreferrer' className='ml-2 text-gray-900 dark:text-gray-100 cursor-pointer'>
                                                    <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' width='26' height='26' viewBox='0 0 24 24'>
                                                        <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};
