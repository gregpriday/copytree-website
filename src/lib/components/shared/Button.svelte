<script lang="ts">
  import { cva, type VariantProps } from 'class-variance-authority';

  const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer overflow-visible relative z-10 hover:shadow-[0_0_15px_5px_var(--color-button-glow-dark)] light:hover:shadow-[0_0_12px_4px_var(--color-button-glow-light)] dark:hover:shadow-[0_0_15px_5px_var(--color-button-glow-dark)] shadow-bloom hover:scale-[1.02] active:scale-[0.98]',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90',
          destructive:
            'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          outline:
            'border border-input hover:bg-accent hover:text-accent-foreground',
          secondary:
            'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ghost: 'hover:bg-accent hover:text-accent-foreground bg-transparent',
          link: 'underline-offset-4 hover:underline text-primary',
        },
        size: {
          default: 'h-10 py-2 px-4',
          sm: 'h-9 px-3 rounded-md',
          lg: 'h-11 px-8 rounded-md',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  );

  type ButtonVariants = VariantProps<typeof buttonVariants>;

  interface ButtonProps extends ButtonVariants {
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onclick?: (_event: MouseEvent) => void;
    children?: any;
  }

  let {
    class: className = '',
    variant = 'default',
    size = 'default',
    type = 'button',
    disabled = false,
    onclick,
    children,
    ...props
  }: ButtonProps = $props();

  let buttonElement: HTMLButtonElement;

  export { buttonElement as element };
</script>

<button
  bind:this={buttonElement}
  class={buttonVariants({ variant, size, class: className })}
  {type}
  {disabled}
  onclick={onclick}
  {...props}
>
  {@render children?.()}
</button>