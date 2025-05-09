export interface Feed {
  class: string;
  icon: string;
  task: string;
  time: string;
}

export const Feeds: Feed[] = [
  {
    class: 'bg-success',
    icon: 'bi bi-git',
    task: 'New commit pushed to `main`.',
    time: 'Just Now'
  },
  {
    class: 'bg-primary',
    icon: 'bi bi-exclamation-triangle',
    task: 'Pull request #42 opened.',
    time: '10 minutes ago'
  },
  {
    class: 'bg-info',
    icon: 'bi bi-chat-left-text',
    task: 'New comment on issue #101.',
    time: '1 hour ago'
  },
  {
    class: 'bg-warning',
    icon: 'bi bi-exclamation-triangle',
    task: 'Build failed on `develop` branch.',
    time: 'Yesterday'
  },
  {
    class: 'bg-danger',
    icon: 'bi bi-person-x',
    task: 'User @johndoe removed from repo.',
    time: '2 days ago'
  }
];
