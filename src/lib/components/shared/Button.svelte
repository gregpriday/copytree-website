<script>
	import { cva } from 'class-variance-authority';

	// Consolidated Button variants: primary, secondary (outline on light surfaces), link, danger.
	// Sizes: sm, default, lg. Focus ring standardized via tokens. Removed glow/shadow bloom from base.
	const buttonVariants = cva(
		'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-visible hover:translate-y-[-1px]',
		{
			variants: {
				variant: {
					primary: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/95 focus-visible:shadow-md',
					secondary:
						'border border-input bg-background/70 text-foreground hover:bg-accent hover:text-accent-foreground',
					link: 'bg-transparent underline-offset-4 text-primary hover:underline focus-visible:ring-0 focus-visible:ring-offset-0',
					danger:
						'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive'
				},
				size: {
					default: 'h-10 py-2 px-4',
					sm: 'h-9 px-3 rounded-md',
					lg: 'h-11 px-8 rounded-md'
				}
			},
			defaultVariants: {
				variant: 'primary',
				size: 'default'
			}
		}
	);

	let {
		class: className = '',
		variant = 'primary',
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
