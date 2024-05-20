interface AssistanceQuestionsProps {
  name: string;
  info: {title: string; desc: string}[];
}
export const assistanceQuestions: AssistanceQuestionsProps[] = [
  {
    name: 'General issues',
    info: [
      {
        title: 'What is our service?',
        desc: ` Our service is an online tool for project and task management, similar to Trello. You can create boards,
      lists, and cards to organize your work, add members, and much more.`,
      },
      {
        title: 'How create an account?',
        desc: ` To create an account, click on the "Sign Up" button in the top right corner of the page and follow the instructions. Enter your email, create a password, and confirm your registration via email.
        `,
      },
    ],
  },
  {
    name: 'Working with Boards and Cards',
    info: [
      {
        title: 'How to create a new board?',
        desc: `1. Click on the "Create Board" button on the main page or in the menu.
       2. Enter the board name and choose a background.
        3. Click "Create", and the board will appear in your list.`,
      },
      {
        title: 'How to add participants to a project?',
        desc: `   1. Open the board and click on the "Participants" icon.
      2.  Enter the user's email and click "Add".
      3.  The participant will receive a notification about joining the board.
        `,
      },
    ],
  },
  {
    name: 'Additional features include',
    info: [
      {
        title: 'How to use labels?',
        desc: `To add a label, open the card and click "Add Label". Choose a color and enter the label name.`,
      },
    ],
  },
  {
    name: 'Technical support',
    info: [
      {
        title: 'How to contact technical support?',
        desc: `Via email: innominatamse@gmail.com`,
      },
    ],
  },
];
