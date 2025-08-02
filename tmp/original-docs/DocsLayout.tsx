import DocsHero from './DocsHero';
import DocsScrollTracker from './DocsScrollTracker';
import GeometricDivider from '../shared/GeometricDivider';
import Overview from './sections/Overview';
import Installation from './sections/Installation';
import QuickStart from './sections/QuickStart';
import Usage from './sections/Usage';
import Configuration from './sections/Configuration';
import Profiles from './sections/Profiles';
import Transformers from './sections/Transformers';
import CommandsReference from './sections/CommandsReference';
import AdvancedFeatures from './sections/AdvancedFeatures';
import Troubleshooting from './sections/Troubleshooting';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'installation', title: 'Installation' },
  { id: 'quick-start', title: 'Quick Start' },
  { id: 'usage', title: 'Usage' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'profiles', title: 'Profiles' },
  { id: 'transformers', title: 'Transformers' },
  { id: 'commands', title: 'Commands Reference' },
  { id: 'advanced', title: 'Advanced Features' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

export default async function DocsLayout() {
  return (
    <>
      {/* Hero Section */}
      <DocsHero />
      
      {/* Main Content Area */}
      <div className="relative">
        <div className="max-w-container mx-auto px-6 md:px-9 py-12">
          <div className="flex gap-12">
            {/* Sidebar with scroll tracking */}
            <DocsScrollTracker sections={sections} />
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="space-y-12">
                <section id="overview" className="scroll-mt-[90px]">
                  <Overview />
                </section>
                <GeometricDivider />
                <section id="installation" className="scroll-mt-[90px]">
                  <Installation />
                </section>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <section id="quick-start" className="scroll-mt-[90px]">
                  <QuickStart />
                </section>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <section id="usage" className="scroll-mt-[90px]">
                  <Usage />
                </section>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <section id="configuration" className="scroll-mt-[90px]">
                  <Configuration />
                </section>
                <GeometricDivider />
                <section id="profiles" className="scroll-mt-[90px]">
                  <Profiles />
                </section>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <section id="transformers" className="scroll-mt-[90px]">
                  <Transformers />
                </section>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <section id="commands" className="scroll-mt-[90px]">
                  <CommandsReference />
                </section>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <section id="advanced" className="scroll-mt-[90px]">
                  <AdvancedFeatures />
                </section>
                <GeometricDivider />
                <section id="troubleshooting" className="scroll-mt-[90px]">
                  <Troubleshooting />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}