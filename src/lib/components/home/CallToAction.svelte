<script>
	import { Button } from '../shared';
</script>

<section class="relative overflow-hidden bg-zinc-900 py-16">
	<!-- Forest background pattern -->
	<div
		class="pointer-events-none absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZDEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMjJDNTVFO3N0b3Atb3BhY2l0eTowLjMiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTBCOTgxO3N0b3Atb3BhY2l0eTowLjIiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzE0QjhBNjtzdG9wLW9wYWNpdHk6MC4xIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI2dyYWQxKSIgc3Ryb2tlLXdpZHRoPSIwLjUiPgogICAgPHBhdGggZD0iTTIwLDEwIEwzMCw1IEw0MCwxMCBMNDAsMjAgTDMwLDI1IEwyMCwyMCBaIiAvPgogICAgPHBhdGggZD0iTTQwLDEwIEw1MCwxNSBMNTAsMjUgTDQwLDMwIEwzMCwyNSBMMzAsMTUgWiIgLz4KICAgIDxwYXRoIGQ9Ik0xMCwyMCBMMjAsMjAgTDIwLDMwIEwxMCwzNSBMMCwzMCBMMCwyMCBaIiAvPgogICAgPHBhdGggZD0iTTMwLDM1IEw0MCwzMCBMNTAsMzUgTDUwLDQ1IEw0MCw1MCBMMzAsNDUgWiIgLz4KICAgIDxwYXRoIGQ9Ik0xMCwzNSBMMjAsNDAgTDIwLDUwIEwxMCw1NSBMMCw1MCBMMCw0MCBaIiAvPgogICAgPHBhdGggZD0iTTIwLDQwIEwzMCwzNSBMMzAsNDUgTDIwLDUwIFoiIC8+CiAgPC9nPgogIDxnIGZpbGw9InVybCgjZ3JhZDEpIiBvcGFjaXR5PSIwLjE1Ij4KICAgIDxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjEuNSIgLz4KICAgIDxjaXJjbGUgY3g9IjQ1IiBjeT0iOCIgcj0iMSIgLz4KICAgIDxjaXJjbGUgY3g9IjM1IiBjeT0iNTIiIHI9IjEuMiIgLz4KICAgIDxjaXJjbGUgY3g9IjgiIGN5PSI0NSIgcj0iMC44IiAvPgogICAgPGNpcmNsZSBjeD0iNTIiIGN5PSIzMCIgcj0iMSIgLz4KICA8L2c+Cjwvc3ZnPg==')] bg-[length:120px_120px] opacity-[0.05] mix-blend-overlay"
	></div>

	<!-- Left side background image -->
	<div class="absolute top-1/2 -left-1/4 left-0 z-0 -translate-y-1/2 opacity-20 blur-sm">
		<enhanced:img
			src="$lib/assets/images/home/intelligent-file-copying.png"
			alt="Background decoration"
			class="h-[400px] w-[600px] object-cover"
			loading="lazy"
		/>
	</div>

	<!-- Right side background image -->
	<div class="absolute top-1/2 -right-1/4 right-0 z-0 -translate-y-1/2 opacity-20 blur-sm">
		<enhanced:img
			src="$lib/assets/images/home/ai-friendly.png"
			alt="Background decoration"
			class="h-[400px] w-[600px] object-cover"
			loading="lazy"
		/>
	</div>

	<!-- Gradient overlay for better text readability -->
	<div
		class="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-zinc-900/90 to-transparent"
	></div>

	<div class="relative z-20 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
			Ready to Transform Your Workflow?
		</h2>

		<p class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-zinc-300">
			Install CopyTree Now and Unlock AI-Powered Coding.
		</p>

		<div class="flex flex-col items-center justify-center gap-4 p-4 sm:flex-row">
			<a href="#getting-started">
				<Button
					size="lg"
					class="group relative overflow-visible rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-2.5 text-base font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg hover:brightness-110 active:scale-[0.98]"
				>
					<!-- Subtle ambient glow -->
					<div
						class="absolute -inset-0.5 rounded-lg bg-emerald-500/30 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"
					></div>
					<span class="relative z-10">Get CopyTree</span>
				</Button>
			</a>

			<a href="/docs">
				<Button
					variant="ghost"
					class="text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
				>
					Read Documentation
				</Button>
			</a>

			<a href="https://github.com/gregpriday/copytree" target="_blank" rel="noopener noreferrer">
				<Button
					variant="ghost"
					class="text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
				>
					View on GitHub
				</Button>
			</a>
		</div>

		<p class="mt-8 text-sm text-zinc-400">Free and open-source CLI tool</p>
	</div>

	<div
		class="relative z-20 mt-8 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-50"
	></div>
</section>
