<script>
	import { cva } from 'class-variance-authority';

	const buttonVariants = cva(
		'inline-flex items-center justify-center rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer overflow-visible relative z-10 hover:shadow-[0_0_15px_5px_var(--color-button-glow-dark)] light:hover:shadow-[0_0_12px_4px_var(--color-button-glow-light)] dark:hover:shadow-[0_0_15px_5px_var(--color-button-glow-dark)] shadow-bloom hover:scale-[1.02] active:scale-[0.98]',
		{
			variants: {
				variant: {
					default: 'bg-primary text-primary-foreground hover:bg-primary/90',
					destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
					outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
					secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
					ghost: 'hover:bg-accent hover:text-accent-foreground bg-transparent',
					link: 'underline-offset-4 hover:underline text-primary',
					'dark-primary': 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-600 hover:to-emerald-700 hover:brightness-110 focus-visible:ring-emerald-500 focus-visible:ring-offset-zinc-950',
					'dark-secondary': 'border border-zinc-700 bg-zinc-800/60 text-zinc-300 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-white focus-visible:ring-emerald-500 focus-visible:ring-offset-zinc-950'
				},
				size: {
					default: 'h-10 py-2 px-4',
					sm: 'h-9 px-3 rounded-md',
					lg: 'h-11 px-8 rounded-md'
				}
			},
			defaultVariants: {
				variant: 'default',
				size: 'default'
			}
		}
	);

	let {
		class: className = '',
		variant = 'default',
		size = 'default',
		type = 'button',
		disabled = false,
		'aria-label': ariaLabel,
		onclick = () => {},
		children,
		...props
	} = $props();

	let buttonElement;

	export { buttonElement as element };
</script>

<button
	bind:this={buttonElement}
	class={buttonVariants({ variant, size, class: className })}
	{type}
	{disabled}
	{onclick}
	aria-label={ariaLabel}
	{...props}
>
	{@render children?.()}
</button>
