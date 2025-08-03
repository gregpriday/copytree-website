<script>
	let { tabs, defaultTab } = $props();
	let activeTab = $state(defaultTab || tabs[0]?.id || '');
</script>

<div class="not-prose my-6">
	<!-- Tab Headers -->
	<div class="flex border-b border-border">
		{#each tabs as tab}
			<button
				onclick={() => (activeTab = tab.id)}
				class="!rounded-none px-6 py-3 text-sm font-medium shadow-none transition-colors duration-200 hover:text-foreground hover:shadow-none focus:ring-2 focus:ring-primary focus:outline-none {activeTab ===
				tab.id
					? 'border-b-2 border-primary bg-primary/5 text-primary'
					: 'text-muted-foreground hover:bg-muted/50'}"
				style="box-shadow: none"
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Tab Content -->
	<div class="pt-6">
		{#each tabs as tab}
			{#if activeTab === tab.id}
				{@render tab.content()}
			{/if}
		{/each}
	</div>
</div>
