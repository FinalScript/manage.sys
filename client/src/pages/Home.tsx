import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import heroSVG from '../assets/images/undraw_hire.svg';
import handshakeVideo from '../assets/videos/handshake.mp4';
import { AuthDataState } from '../types';

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
    const authData = useSelector((state: AuthDataState) => state.authReducer.authData);
    const navigate = useNavigate();
    const [didScroll, setDidScroll] = useState(false);

    useEffect(() => {
        document.addEventListener('scroll', () => {
            setDidScroll(window.scrollY > 165);
        });

        return () => {
            document.removeEventListener('scroll', () => {
                setDidScroll(window.scrollY > 165);
            });
        };
    }, []);

    useEffect(() => {
        document.title = 'Home | Manage.sys';
    }, []);

    return (
        <div className='relative'>
            <div className='fixed -z-20 w-full overflow-hidden'>
                <video autoPlay loop muted className='w-screen h-screen object-fill'>
                    <source src={handshakeVideo} type='video/mp4' />
                </video>
            </div>
            <div className='fixed -z-10 w-full h-full dark:bg-gray-800 bg-white dark:opacity-90 opacity-70'></div>
            <div className='h-full  text-white relative'>
                <section className='h-screen text-gray-700 dark:text-gray-300 body-font flex justify-center items-center relative'>
                    <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
                        <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10 text-gray-800 dark:text-gray-50'>
                            <svg
                                className='object-cover object-center rounded'
                                data-name='Layer 1'
                                xmlns='http://www.w3.org/2000/svg'
                                width='100%'
                                height='100%'
                                fill='currentColor'
                                viewBox='0 0 898.09814 398.74219'
                                xmlnsXlink='http://www.w3.org/1999/xlink'>
                                <path
                                    d='M533.28931,505.37109H169.45093a18.5208,18.5208,0,0,1-18.5-18.5V264.71729a14.104,14.104,0,0,1,14.08789-14.08838H537.49219a14.31325,14.31325,0,0,1,14.29712,14.29736V486.87109A18.5208,18.5208,0,0,1,533.28931,505.37109Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='currentColor'
                                />
                                <path
                                    d='M533.28931,505.37109H169.45093a18.5208,18.5208,0,0,1-18.5-18.5V264.71729a14.104,14.104,0,0,1,14.08789-14.08838H537.49219a14.31325,14.31325,0,0,1,14.29712,14.29736V486.87109A18.5208,18.5208,0,0,1,533.28931,505.37109ZM165.03882,254.62891a10.09971,10.09971,0,0,0-10.08789,10.08838v222.1538a14.51653,14.51653,0,0,0,14.5,14.5H533.28931a14.51653,14.51653,0,0,0,14.5-14.5V264.92627a10.30867,10.30867,0,0,0-10.29712-10.29736Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M317.06236,449.12491h-109.02a11.01778,11.01778,0,0,1-10.905-9.563,9.97492,9.97492,0,0,1-.095-1.437v-120.25a11.01245,11.01245,0,0,1,11-11h109.02a11.01245,11.01245,0,0,1,11,11v120.25A11.01245,11.01245,0,0,1,317.06236,449.12491Zm-109.02-136.25a5.00573,5.00573,0,0,0-5,5v120.25a4.26094,4.26094,0,0,0,.03809.61475,5.01529,5.01529,0,0,0,4.96191,4.38525h109.02a5.00573,5.00573,0,0,0,5-5v-120.25a5.00573,5.00573,0,0,0-5-5Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M497.69782,410.02481h-132a8,8,0,1,1,0-16h132a8,8,0,0,1,0,16Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M437.69782,376.02481h-72a8,8,0,1,1,0-16h72a8,8,0,0,1,0,16Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M298.49876,374.69494c0,17.67311-16.3416,15-36.5,15s-36.5,2.67311-36.5-15,7.98246-49,36.5-49C291.49876,325.69494,298.49876,357.02183,298.49876,374.69494Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#2f2e41'
                                />
                                <path
                                    d='M299.9751,404.43872a9.06449,9.06449,0,0,0-3.96-4.84,7.8666,7.8666,0,0,0-1.12012-.57,9.05434,9.05434,0,0,0-11.98,11.47l14.54,33.05H316.605Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M236.5249,406.23871a9.05548,9.05548,0,0,0-12.48974,5.17l-13.54,31.85a7.8764,7.8764,0,0,0,2.12988.29h16.99023l11.4795-26.08A9.037,9.037,0,0,0,236.5249,406.23871Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='currentColor'
                                />
                                <circle cx='110.92579' cy='114.47548' r='24.56103' fill='#ffb8b8' />
                                <path
                                    d='M296.44482,399.98871c-.13964-.13-.27978-.27-.42968-.39a15.95256,15.95256,0,0,0-12.75-3.97l-45.26026,5.73a16.06191,16.06191,0,0,0-14.02,17.44c.62012,6.98,1.62012,15.79,3.22022,24.75h71.5l2.62988-30.56A16.035,16.035,0,0,0,296.44482,399.98871Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M233.49876,362.69492v0h9.71436l4.28564-12,.85694,12h4.64306l2.5-7,.5,7h34.5v0a26,26,0,0,0-26-26h-5A26,26,0,0,0,233.49876,362.69492Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#2f2e41'
                                />
                                <path
                                    d='M648.21069,486.87109V264.92627a14.31325,14.31325,0,0,1,14.29712-14.29736h372.45337a14.104,14.104,0,0,1,14.08789,14.08838v222.1538a18.5208,18.5208,0,0,1-18.5,18.5H666.71069A18.5208,18.5208,0,0,1,648.21069,486.87109Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='currentColor'
                                />
                                <path
                                    d='M648.21069,486.87109V264.92627a14.31325,14.31325,0,0,1,14.29712-14.29736h372.45337a14.104,14.104,0,0,1,14.08789,14.08838v222.1538a18.5208,18.5208,0,0,1-18.5,18.5H666.71069A18.5208,18.5208,0,0,1,648.21069,486.87109Zm14.29712-232.24218a10.30867,10.30867,0,0,0-10.29712,10.29736V486.87109a14.51653,14.51653,0,0,0,14.5,14.5h363.83838a14.51653,14.51653,0,0,0,14.5-14.5V264.71729a10.09971,10.09971,0,0,0-10.08789-10.08838Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M871.93764,438.12491v-120.25a11.01245,11.01245,0,0,1,11-11h109.02a11.01245,11.01245,0,0,1,11,11v120.25a9.97492,9.97492,0,0,1-.095,1.437,11.01778,11.01778,0,0,1-10.905,9.563h-109.02A11.01245,11.01245,0,0,1,871.93764,438.12491Zm11-125.25a5.00573,5.00573,0,0,0-5,5v120.25a5.00573,5.00573,0,0,0,5,5h109.02a5.01529,5.01529,0,0,0,4.96191-4.38525,4.26094,4.26094,0,0,0,.03809-.61475v-120.25a5.00573,5.00573,0,0,0-5-5Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M694.30218,402.02481a8.00917,8.00917,0,0,1,8-8h132a8,8,0,1,1,0,16h-132A8.00916,8.00916,0,0,1,694.30218,402.02481Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M694.30218,368.02481a8.00917,8.00917,0,0,1,8-8h72a8,8,0,1,1,0,16h-72A8.00916,8.00916,0,0,1,694.30218,368.02481Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M910.50547,353.60478c7.01074,13.78357,12.536,28,28,28a28,28,0,0,0,0-56C922.78965,325.408,897.45664,327.94938,910.50547,353.60478Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#2f2e41'
                                />
                                <circle cx='786.17659' cy='106.96012' r='24.56103' fill='#a0616a' />
                                <path
                                    d='M970.65967,402.35876a42.79043,42.79043,0,0,0-5.1499-4.76,41.72508,41.72508,0,0,0-28.39014-8.8q-.61451.02994-1.23.09a41.82491,41.82491,0,0,0-30.15967,16.64,42.34634,42.34634,0,0,0-7.52,34.15c.27,1.25.50977,2.51.73975,3.77h81.41992l.93994-6.3A42.09424,42.09424,0,0,0,970.65967,402.35876Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M983.12988,408.92877a14.25389,14.25389,0,0,0-13.93017-11.8c-.12989,0-.27.01-.39991.01a14.34716,14.34716,0,0,0-3.29.46,14.19973,14.19973,0,0,0-10.06006,17.43l7.68994,28.42H989.02Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M926.17969,401.47876a14.17548,14.17548,0,0,0-4.08985-4.88,13.76889,13.76889,0,0,0-4.02-2.1,13.35784,13.35784,0,0,0-1.81005-.48,14.2719,14.2719,0,0,0-16.1001,9.24l-14.07959,40.19H912.7998l13.62989-29.56A14.091,14.091,0,0,0,926.17969,401.47876Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M911.06442,343.70843a33.40479,33.40479,0,0,0,19.09068,5.89985,20.47074,20.47074,0,0,1-8.11361,3.338,67.35879,67.35879,0,0,0,27.514.1546,17.80739,17.80739,0,0,0,5.75977-1.97824,7.28916,7.28916,0,0,0,3.55521-4.7547c.60365-3.44852-2.08347-6.58158-4.876-8.69308A35.96735,35.96735,0,0,0,923.77,331.63519c-3.37627.87272-6.75853,2.34726-8.9515,5.05866s-2.84258,6.8915-.75322,9.68352Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#2f2e41'
                                />
                                <path
                                    d='M781.91919,649.37109H418.08081a18.5208,18.5208,0,0,1-18.5-18.5V408.71729a14.104,14.104,0,0,1,14.08789-14.08838H786.12207a14.31325,14.31325,0,0,1,14.29712,14.29736V630.87109A18.5208,18.5208,0,0,1,781.91919,649.37109Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='currentColor'
                                />
                                <path
                                    d='M781.91919,649.37109H418.08081a18.5208,18.5208,0,0,1-18.5-18.5V408.71729a14.104,14.104,0,0,1,14.08789-14.08838H786.12207a14.31325,14.31325,0,0,1,14.29712,14.29736V630.87109A18.5208,18.5208,0,0,1,781.91919,649.37109ZM413.6687,398.62891a10.09971,10.09971,0,0,0-10.08789,10.08838v222.1538a14.51653,14.51653,0,0,0,14.5,14.5H781.91919a14.51653,14.51653,0,0,0,14.5-14.5V408.92627a10.30867,10.30867,0,0,0-10.29712-10.29736Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M565.69224,593.12491h-109.02a11.01778,11.01778,0,0,1-10.905-9.563,9.97635,9.97635,0,0,1-.095-1.437v-120.25a11.01245,11.01245,0,0,1,11-11h109.02a11.01245,11.01245,0,0,1,11,11v120.25A11.01245,11.01245,0,0,1,565.69224,593.12491Zm-109.02-136.25a5.00573,5.00573,0,0,0-5,5v120.25a4.26238,4.26238,0,0,0,.03809.61475,5.01529,5.01529,0,0,0,4.96191,4.38525h109.02a5.00573,5.00573,0,0,0,5-5v-120.25a5.00573,5.00573,0,0,0-5-5Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M509.59925,472.85881c-7.097-3.30156-15.81044-4.38389-23.03182-1.316s-12.14452,10.93153-9.80947,17.89082c1.05869,3.15525,3.46989,6.25836,2.53051,9.445-.72307,2.45284-3.24546,4.07226-5.72259,5.22372s-5.18694,2.11951-6.97842,4.06155-2.16509,5.28532.07286,6.79138c.73731.49619,1.65885.7315,2.37375,1.25437a3.772,3.772,0,0,1,1.16432,4.2222,8.89327,8.89327,0,0,1-2.85084,3.75065c-2.54053,2.19094-5.89807,4.69849-5.10925,7.80873a5.47829,5.47829,0,0,0,3.697,3.45788,18.36721,18.36721,0,0,0,5.42688.71627l74.96621,2.36156a28.42291,28.42291,0,0,0,7.40167-.41344,8.76188,8.76188,0,0,0,5.81294-3.905c1.43559-2.65728.4931-5.93058-1.2798-8.41187s-4.282-4.43862-6.35525-6.71708-3.76948-5.12271-3.404-8.06748c.29256-2.35732,1.84718-4.3947,2.96321-6.5366s1.76427-4.81848.31886-6.78894c-2.03678-2.77664-6.92687-2.5255-9.24284-5.11283-1.74777-1.95255-1.41027-4.76345-1.584-7.28134-.418-6.05656-4.61117-11.77645-10.58027-14.43257a20.83058,20.83058,0,0,0-18.95323,1.2908Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#2f2e41'
                                />
                                <circle cx='361.4221' cy='262.75611' r='24.56103' fill='#a0616a' />
                                <path
                                    d='M544.61935,569.66483a23.78832,23.78832,0,0,0-12.68018-20.9c-.30957-.17-.62988-.32-.94971-.47a23.61949,23.61949,0,0,0-8.81005-2.24l-23.37989-1.31a23.60045,23.60045,0,0,0-9.70019,1.49,22.6607,22.6607,0,0,0-2.21.96,23.53962,23.53962,0,0,0-6.12012,4.35,23.80582,23.80582,0,0,0-7.06006,17.94l.42041,9.91,2.93994,7.63h65.36963a17.95992,17.95992,0,0,0,2.1001-3.18A15.91881,15.91881,0,0,0,544.61935,569.66483Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M543.01925,556.52481a14.14311,14.14311,0,0,0-4.83984-5.74,14.45108,14.45108,0,0,0-5.01026-2.18,14.66536,14.66536,0,0,0-2.17969-.31,14.087,14.087,0,0,0-4.30029.37,14.2736,14.2736,0,0,0-9.18994,20.49l8.99023,17.02.44971.85H557.1296Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M493.60909,547.65482a14.34142,14.34142,0,0,0-4.50976-1.42,13.89783,13.89783,0,0,0-3.52979-.05,14.25733,14.25733,0,0,0-12.36035,11.29l-6.08984,29.55h23.81982l4.4502-1.81994,5.54-21.26A14.31954,14.31954,0,0,0,493.60909,547.65482Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#3f3d56'
                                />
                                <path
                                    d='M487.24635,509.89315c7.75642-.62285,14.19623-8.37141,13.38973-16.1109A13.00908,13.00908,0,0,0,511.77729,507.028c3.55787.392,7.4584-.68444,10.55524,1.11048,3.43,1.988,4.52758,6.81577,8.10091,8.53282,3.45255,1.659,7.8377-.60361,9.54345-4.03331s1.28714-7.5502.1567-11.21a31.65249,31.65249,0,0,0-52.68951-12.97513c-3.26143,3.28049-5.851,7.46146-6.271,12.06822s1.71705,9.60534,5.85416,11.67485Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#2f2e41'
                                />
                                <path
                                    d='M746.3277,554.02481h-132a8,8,0,1,1,0-16h132a8,8,0,0,1,0,16Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#e6e6e6'
                                />
                                <path
                                    d='M686.3277,520.02481h-72a8,8,0,1,1,0-16h72a8,8,0,0,1,0,16Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#a43070'
                                />
                                <path
                                    d='M724.96059,578.44873a26.378,26.378,0,0,0-.0002,52.75591h.0002a26.378,26.378,0,0,0,0-52.75591Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#a43070'
                                />
                                <path
                                    id='f276b720-7c73-4755-84a7-b208d54eb1fc-327'
                                    data-name='Path 395'
                                    d='M722.45772,615.78162a3.20123,3.20123,0,0,1-1.9259-.64006l-.03446-.02584-7.25395-5.549a3.22361,3.22361,0,0,1,3.92261-5.11661l4.69853,3.60305,11.10288-14.48493a3.22224,3.22224,0,0,1,4.51774-.59673l.00093.0007-.0689.09568.07077-.09568a3.22613,3.22613,0,0,1,.596,4.51864l-13.05941,17.02985a3.22419,3.22419,0,0,1-2.564,1.25715Z'
                                    transform='translate(-150.95093 -250.62891)'
                                    fill='#fff'
                                />
                            </svg>
                        </div>
                        <div className='lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'>
                            <h1 className='mb-5 title-font sm:text-5xl text-3xl font-medium text-gray-800 dark:text-white'>
                                The one and only
                                <span className='mt-3 block'>management system you need</span>
                            </h1>
                            <p className='mb-8 text-lg leading-relaxed'>
                                Safe, Manageable, Secure. Save all your stores and employees in one place, with representations of the most used currencies
                                around the world.
                            </p>
                            <div className='flex justify-center'>
                                <button
                                    onClick={() => {
                                        navigate(authData ? '/dashboard' : '/auth');
                                    }}
                                    className='inline-flex text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none hover:bg-pink-800 rounded text-lg'>
                                    Get Started
                                </button>
                                <a
                                    href='https://github.com/FinalScript/manage.sys/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='ml-4 inline-flex dark:text-gray-400 text-gray-800 dark:bg-gray-600 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:dark:bg-gray-700 hover:bg-gray-300 rounded text-lg'>
                                    Project Repo
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            'text-black dark:text-white mt-10 absolute z-10 bottom-10 transition-all duration-200 ' + (didScroll ? 'opacity-0' : 'opacity-100')
                        }>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-10 w-10 flex items-center m-auto animate-bounce'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth='2'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                        </svg>
                    </div>
                </section>
                <section className='text-gray-700 dark:text-gray-300 body-font'>
                    <div className='container px-5 py-24 mx-auto'>
                        <div className='flex flex-col text-center w-full mb-12'>
                            <h1 className='text-4xl font-semibold title-font mb-4 text-gray-900 dark:text-white'>OUR TEAM</h1>
                            <p className='lg:w-2/3 mx-auto leading-relaxed text-xl'>
                                A group of aspiring and young developers looking to provide impactful services and applications.
                            </p>
                        </div>
                        <div className='flex flex-wrap justify-center space-x-5 -m-4'>
                            {teamData.map((member) => {
                                return (
                                    <div key={member.name} className='p-4 lg:w-1/4 md:w-1/2 rounded-xl hover:bg-gray-200 hover:dark:bg-gray-700 hover:scale-105 hover:shadow-xl transition-all duration-100'>
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
                                                    <a
                                                        href={member.linkedIn}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className='text-gray-900 dark:text-gray-100 cursor-pointer'>
                                                        <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' width='26' height='26' viewBox='0 0 24 24'>
                                                            <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                                                        </svg>
                                                    </a>
                                                    <a
                                                        href={member.github}
                                                        target='_blank'
                                                        rel='noopener noreferrer'
                                                        className='ml-2 text-gray-900 dark:text-gray-100 cursor-pointer'>
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
        </div>
    );
};
