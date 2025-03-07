<script>
	import { HoverCard } from '@evidence-dev/core-components';
	export let name = '';
	export let description = '';
	export let required = false;
	export let options = [];
	export let defaultValue = '';
	export let type = '';
	let copyStatus = {};

	async function copyToClipboard(text, option) {
		try {
			await navigator.clipboard.writeText(text);
			copyStatus[option] = true;
			setTimeout(() => {
				copyStatus[option] = false;
			}, 2000);
		} catch (err) {}
	}
</script>

<section class="pt-4 pb-2 border-b text-sm flex flex-col lg:flex-row gap-4">
	<div class="min-w-48 flex justify-between mr-4">
		<div class="font-mono">
			<span
				class="px-1 py-0.5 text-xs font-medium text-gray-950 bg-gray-50 border rounded select-all"
			>
				{name}
			</span>
		</div>
		{#if required}
			<span class="text-red-500 uppercase tracking-wide">Required</span>
		{/if}
	</div>
	<div>
		<div id="markdown-slot"><slot /></div>
		{#if Array.isArray(options) && options.length > 0}
			<div class="mt-1 select-none flex">
				<span class="text-sm text-gray-400 mr-2">Options:</span>
				<div class="flex flex-wrap gap-1">
					{#each options as option}
						<HoverCard>
							<button
								slot="trigger"
								class="bg-blue-50 rounded-full min-w-3 px-3 text-blue-700 hover:bg-blue-100 hover:text-blue-800 flex justify-center transition-colors duration-200"
								on:click={() => copyToClipboard(`${name}=${option}`, option)}
							>
								{option}
							</button>
							<div slot="content" class="text-xs text-center min-w-28">
								<p class="font-mono bg-gray-50 rounded-t-md px-4 py-1 text-gray-700">
									{name}=<span class="text-blue-700">{option}</span>
								</p>
								<p class="px-4 py-1 text-gray-700 font-sans">
									{copyStatus[option] ? 'Copied' : 'Click to Copy'}
								</p>
							</div>
						</HoverCard>
					{/each}
				</div>
			</div>
		{:else if typeof options === 'string' && options.length > 0}
			<dl class="flex select-none mt-1">
				<dt class="text-sm text-gray-400">Options:</dt>
				<dd class="ml-2 text-sm">{options}</dd>
			</dl>
		{/if}
		{#if defaultValue && defaultValue !== '-'}
			<dl class="flex select-none mt-1">
				<dt class="text-sm text-gray-400">Default:</dt>
				<dd class="ml-2 text-sm">{defaultValue}</dd>
			</dl>
		{/if}
		{#if Array.isArray(type) && type.length > 0}
			<div class="flex select-none mt-1">
				<span class="text-sm text-gray-400">Type:</span>
				{#each type as t}
					<span
						class="bg-blue-50 rounded-full min-w-3 px-3 text-blue-700 hover:bg-blue-100 hover:text-blue-800 flex justify-center transition-colors duration-200"
						>{t}</span
					>
				{/each}
			</div>
		{:else if typeof type === 'string' && type.length > 0}
			<dl class="flex select-none mt-1">
				<dt class="text-sm text-gray-400">Type:</dt>
				<dd
					class="bg-blue-50 rounded-full min-w-3 px-3 text-blue-700 hover:bg-blue-100 hover:text-blue-800 flex justify-center transition-colors duration-200"
				>
					{type}
				</dd>
			</dl>
		{/if}
	</div>
</section>

<style>
	#markdown-slot :global(*) {
		@apply text-sm;
	}
</style>
