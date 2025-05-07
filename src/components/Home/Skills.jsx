import { useEffect, useRef } from 'react';
import AnimatedText from '../Utils/AnimatedText';
import Circle from '../Utils/Circle';
import { gsap } from '../../gsap-config';

const Skills = () => {
  // Refs
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const textRef = useRef(null);
  const textContainerRef = useRef(null);

  // Animation configs
  const circleAnimation = {
    from: {
      x: 0,
      width: '40px',
      height: '40px',
      backgroundColor: '#397adc',
    },
    to: {
      x: 115,
      duration: 2.5,
      ease: 'sine.inOut',
      backgroundColor: '#99b5e0',
      yoyo: true,
      repeat: -1,
    },
  };

  // Skills data
  const skillsData = [
    {
      id: 1,
      name: 'html',
      title: 'HTML',
      color: '#e68b80',
      iconFill: '#e34f26',
      iconPath:
        'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z',
      description: 'Building flexible web page structures using HTML5.',
    },
    {
      id: 2,
      name: 'css',
      title: 'CSS',
      color: '#b1c4ab',
      iconFill: '#2965f1',
      iconPath:
        'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z',
      description: 'Designing responsive and elegant interfaces with CSS3.',
    },
    {
      id: 3,
      name: 'bootstrap',
      title: 'Bootstrap',
      color: '#a6a6d2',
      iconFill: '#563d7c',
      iconPath:
        'M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z',
      description: 'Quickly creating responsive websites with Bootstrap.',
    },
    {
      id: 4,
      name: 'javascript',
      title: 'JavaScript',
      color: '#b1c4ab',
      iconFill: '#f0db4f',
      iconPath:
        'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
      description: 'Bringing interactivity and dynamics to the web.',
    },
    {
      id: 5,
      name: 'tailwind',
      title: 'Tailwind CSS',
      color: '#213e8f',
      iconFill: '#38B2AC',
      iconPath:
        'M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z',
      description: 'Crafting fast and flexible designs.',
    },
    {
      id: 6,
      name: 'react',
      title: 'React JS',
      color: '#213e8f',
      iconFill: '#61DAFB',
      iconPath:
        'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z',
      description: 'Developing dynamic front-end applications',
    },
  ];

  // Create refs dynamically for each skill
  const skillRefs = useRef(
    skillsData.reduce((acc, skill) => {
      acc[`dev_${skill.id}Ref`] = useRef(null);
      acc[`subtitle_${skill.id}Ref`] = useRef(null);
      return acc;
    }, {})
  ).current;

  useEffect(() => {
    const setupAnimations = () => {
      const mm = gsap.matchMedia();
      const isMobile = window.innerWidth <= 767;

      // Main pinning animation
      const setupPinAnimation = () => {
        return gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=100% 60%',
            scrub: 1.5,
            pin: leftRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          },
        });
      };

      // Text animation
      const setupTextAnimation = () => {
        return gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.8,
            stagger: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: rightRef.current,
              start: isMobile ? '-20% 90%' : 'top 80%',
              end: isMobile ? '0% 90%' : '10% 80%',
              scrub: 1,
            },
          }
        );
      };

      // Skill item animations
      const setupSkillAnimations = () => {
        skillsData.forEach((skill, index) => {
          const devRef = skillRefs[`dev_${skill.id}Ref`];
          const subtitleRef = skillRefs[`subtitle_${skill.id}Ref`];
          const delay = index * 0.15;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: devRef.current,
              start: isMobile ? '0% 80%' : 'top 75%',
              end: isMobile ? '80% 40%' : '70% 30%',
              scrub: 1.2,
            },
          });

          timeline
            .fromTo(
              devRef.current,
              { y: 40, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: 'power1.out',
                duration: 1.5,
              },
              delay
            )
            .fromTo(
              subtitleRef.current,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: 'sine.out',
                stagger: 0.1,
                duration: 1.2,
              },
              delay + 0.2
            )
            .to(
              devRef.current,
              {
                y: -40,
                opacity: 0,
                scale: 0.9,
                ease: 'power1.inOut',
                duration: 1,
              },
              `+=${2.5 - index * 0.1}`
            )
            .to(
              subtitleRef.current,
              {
                y: -30,
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.8,
              },
              '-=0.6'
            );
        });
      };

      // Container rotation animation
      const setupContainerAnimation = (timeline) => {
        timeline.fromTo(
          textContainerRef.current,
          { rotation: 0, x: 0, scale: 1 },
          {
            rotation: 360,
            x: 80,
            scale: 0.85,
            duration: 2.5,
            ease: 'power2.inOut',
          },
          0
        );
      };

      // Initialize all animations
      gsap.defaults({ duration: 1.2, ease: 'power3.out' });

      const pinTimeline = setupPinAnimation();
      setupContainerAnimation(pinTimeline);
      setupTextAnimation();
      setupSkillAnimations();

      return () => mm.revert();
    };

    const ctx = gsap.context(setupAnimations, containerRef);
    return () => ctx.revert();
  }, [skillsData, skillRefs]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden h-[230vh] md:h-[280vh]  bg-black w-full flex flex-col md:flex-row"
    >
      {/* Left Section */}
      <div
        ref={leftRef}
        className="z-20 px-5 md:px-10 w-full md:w-1/2 h-screen flex flex-col mt-10 md:mt-20"
      >
        <div className="flex items-center relative text-[#ebeff6] text-[2rem] md:text-[3rem]">
          <AnimatedText
            ref={textRef}
            text="Skills"
            className="z-20 tracking-[0.8rem] whitespace-nowrap will-change-transform"
          />
          <Circle
            style="z-10 absolute bg-[#214d8e] rounded-[50%] h-[7vh] w-[7vh] will-change-transform"
            AnimationFrom={circleAnimation.from}
            AnimationTo={circleAnimation.to}
          />
        </div>
        <svg
          ref={textContainerRef}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 md:mt-4 will-change-transform"
          fill="#ebeff6"
          aria-label="Skills decoration"
        >
          <path d="M19.829 22.075c-.064.192 2.63-2.76 2.63-2.76-.256-2.759-1.54-5.775-1.54-5.775-2.117-4.428-6.801-5.904-9.56-3.53-.129.065-.322.129-.45.193 2.118-2.952 6.93-2.695 10.075.963 0 0 1.412 1.732 2.438 4.363.257-.898.45-1.86.514-2.823-1.669-2.31-3.594-3.658-3.594-3.658-3.978-2.695-8.663-1.732-9.946 1.604-.129.193-.257.385-.321.578.385-3.594 4.684-5.84 9.176-4.3 0 0 2.182.835 4.428 2.631 0-.128-.064-.256-.128-.449-.257-.962-.578-1.86-1.027-2.695-2.567-1.155-4.877-1.347-4.877-1.347-4.877-.321-8.535 3.08-7.765 6.802v.513c-1.668-3.337.963-7.636 5.776-8.535 0 0 2.246-.385 5.005 0a11.844 11.844 0 0 0-2.374-1.989c-2.76.32-4.813 1.283-4.813 1.283-4.428 2.182-5.84 7.06-3.401 9.819.064.192.192.32.32.449-3.08-2.054-2.887-7.123.77-10.396 0 0 1.733-1.476 4.3-2.503C14.375.193 13.283 0 12.193 0 10.01 1.668 8.79 3.465 8.79 3.465c-2.759 4.171-1.604 9.113 1.99 10.268h.064c.128.064.192.128.32.192-3.657-.192-6.031-4.684-4.427-9.369 0 0 .77-2.053 2.374-4.171-.962.257-1.796.578-2.63 1.09-1.027 2.568-1.284 4.75-1.284 4.75-.321 4.94 3.016 8.599 6.61 7.893H12c.128 0 .257 0 .385-.065-3.273 1.669-7.444-1.026-8.406-5.903 0 0-.385-2.182 0-4.941-.77.77-1.476 1.604-2.054 2.63.321 2.696 1.284 4.685 1.284 4.685 2.181 4.492 6.994 5.968 9.754 3.401l.064-.064c.128-.064.256-.128.32-.257-1.989 3.145-6.994 3.016-10.203-.77 0 0-1.604-2.117-2.438-4.556 0-.064-.642 3.209-.642 3.209 1.604 1.925 3.658 3.529 3.658 3.529 3.979 2.695 8.663 1.668 9.946-1.668a1.39 1.39 0 0 0 .321-.514c-.385 3.594-4.684 5.84-9.176 4.236 0 0-1.99-.77-4.107-2.439 0 .064.064.193.064.257a15.14 15.14 0 0 0 1.091 2.823c2.438 1.027 4.62 1.22 4.62 1.22 4.877.32 8.47-3.08 7.765-6.674v-.514c1.54 3.337-1.09 7.508-5.84 8.47 0 0-2.117.386-4.748 0a11.229 11.229 0 0 0 2.117 1.798c2.76-.321 4.813-1.284 4.813-1.284 4.3-2.117 5.776-6.802 3.53-9.625-.065-.193-.193-.385-.321-.578 2.952 2.118 2.76 7.059-.899 10.267 0 0-1.796 1.476-4.427 2.567 1.026.321 2.117.578 3.208.642 2.246-1.733 3.594-3.658 3.594-3.658 2.76-4.17 1.604-9.112-1.925-10.267a1.04 1.04 0 0 0-.45-.257c3.722.193 6.032 4.685 4.428 9.37 0 0-.77 2.245-2.567 4.491.129 0 .257-.064.45-.128a17.58 17.58 0 0 0 2.566-.963c1.091-2.63 1.284-4.94 1.284-4.94.32-4.878-2.888-8.472-6.417-7.958-.129 0-.321-.064-.45-.064h-.128c3.273-1.412 7.316 1.219 8.214 5.968 0 0 .578 2.246.128 4.94-.064.386-.256.963-.577 1.54z" />
        </svg>
      </div>

      {/* Right Section - Skills List */}
      <div
        ref={rightRef}
        className="flex flex-col gap-5 w-full md:w-1/2 h-full will-change-transform"
      >
        {skillsData.map((skill) => (
          <div
            key={skill.id}
            ref={skillRefs[`dev_${skill.id}Ref`]}
            className="flex flex-col items-center justify-center gap-7 w-full h-[40%] md:h-[20%] px-4 will-change-transform"
          >
            <div className="flex md:flex-row flex-col gap-4 justify-around w-full items-center">
              <p
                className="text-3xl transition-colors duration-300 will-change-transform"
                style={{ color: skill.color }}
              >
                {skill.title}
              </p>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 md:w-24 md:h-24 transition-all duration-300 will-change-transform"
                fill={skill.iconFill}
                aria-label={`${skill.title} icon`}
              >
                <title>{skill.title}</title>
                <path d={skill.iconPath} />
              </svg>
            </div>
            <AnimatedText
              ref={skillRefs[`subtitle_${skill.id}Ref`]}
              text={skill.description}
              className="text-base md:text-lg md:whitespace-nowrap text-center px-4 will-change-transform"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
