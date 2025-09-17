export interface BrokenLink {
  url: string;
  statusCode: number;
  error: string;
  foundOn: string;
}

export class BrokenLinksChecker {
  static async checkForBrokenLinks(urls: string[]): Promise<string[]> {
    // Simulate broken link checking
    const brokenLinks: string[] = [];
    
    // Mock some broken links for demonstration
    urls.forEach((url, index) => {
      // Simulate random broken links (about 10% chance)
      if (Math.random() < 0.1) {
        // Create realistic broken link scenarios
        const scenarios = [
          `${url}/missing-page`,
          `${url}/old-content.html`,
          `${url}/404-page`,
          `${url}/deleted-file.pdf`,
          `${url}/moved-content`
        ];
        
        const brokenUrl = scenarios[Math.floor(Math.random() * scenarios.length)];
        brokenLinks.push(brokenUrl);
      }
    });
    
    // Add some external broken links
    if (urls.length > 0) {
      const externalBrokenLinks = [
        'https://example-broken-site.com/missing',
        'https://old-domain.net/page',
        'https://defunct-service.org/api'
      ];
      
      brokenLinks.push(...externalBrokenLinks.slice(0, Math.floor(Math.random() * 3)));
    }
    
    return brokenLinks;
  }

  static generateBrokenLinksReport(brokenLinks: string[]): string {
    if (brokenLinks.length === 0) {
      return 'No broken links found!';
    }

    const report = [
      '# Broken Links Report',
      `Generated on: ${new Date().toLocaleDateString()}`,
      `Total broken links found: ${brokenLinks.length}`,
      '',
      '## Broken Links:',
      ...brokenLinks.map((link, index) => `${index + 1}. ${link}`)
    ];

    return report.join('\n');
  }

  static downloadBrokenLinksReport(brokenLinks: string[], domain: string): void {
    const report = this.generateBrokenLinksReport(brokenLinks);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${domain}-broken-links-report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}