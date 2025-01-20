# Website Testing Checklist

## Functionality
### Site Map and Navigation
- [ ] Site map validation:
  - [ ] Compare all categories on site map with home page
  - [ ] Verify all section links are working
  - [ ] Check for correct hierarchical structure
  - [ ] Test breadcrumb navigation if present

### Navigation Links
- [ ] Header navigation:
  - [ ] Test all main menu items
  - [ ] Verify dropdown menus (if any)
  - [ ] Check active state indicators
- [ ] Footer navigation:
  - [ ] Test all footer links
  - [ ] Verify social media links open in new tab
- [ ] Sidebar/auxiliary navigation:
  - [ ] Test category filters
  - [ ] Check sorting options

### Common Conversions Tool
- [ ] Basic functionality:
  - [ ] Tool loads properly
  - [ ] All conversion types are available
  - [ ] Category selection works
- [ ] Calculations testing:
  - [ ] Test standard conversions (e.g., 1 kg to lbs)
  - [ ] Test decimal numbers (e.g., 0.5 units)
  - [ ] Test large numbers (e.g., 999999)
  - [ ] Test small numbers (e.g., 0.0001)
  - [ ] Test negative numbers where applicable
  - [ ] Verify precision/rounding
- [ ] Error handling:
  - [ ] Test invalid inputs
  - [ ] Verify error messages
  - [ ] Check input validation

### Static Pages
- [ ] About page:
  - [ ] Content loads correctly
  - [ ] Images display properly
  - [ ] Links within content work
- [ ] Privacy Policy:
  - [ ] All sections present
  - [ ] Last updated date visible
  - [ ] No placeholder text remains
- [ ] Terms of Service:
  - [ ] All sections present
  - [ ] Legal information complete
  - [ ] Links to related policies work

### Feedback System
- [ ] Submit feedback button:
  - [ ] Button visible and properly styled
  - [ ] Form opens correctly
  - [ ] All fields are present
- [ ] Form validation:
  - [ ] Required fields marked
  - [ ] Email format validation
  - [ ] Character limits working
- [ ] Submission:
  - [ ] Success message displays
  - [ ] Data sends correctly
  - [ ] Error handling works

## Compatibility & Responsiveness
### Cross-browser Testing
- [ ] Chrome latest:
  - [ ] Core functionality
  - [ ] Styling consistency
  - [ ] Performance check
- [ ] Firefox latest:
  - [ ] Core functionality
  - [ ] Styling consistency
  - [ ] Performance check
- [ ] Safari latest:
  - [ ] Core functionality
  - [ ] Styling consistency
  - [ ] Performance check
- [ ] Edge latest:
  - [ ] Core functionality
  - [ ] Styling consistency
  - [ ] Performance check

### Responsive Design
- [ ] Mobile testing (320px - 428px):
  - [ ] Navigation menu
  - [ ] Content readability
  - [ ] Touch targets (min 44x44px)
  - [ ] Form usability
- [ ] Tablet testing (768px - 1024px):
  - [ ] Layout adaptation
  - [ ] Image scaling
  - [ ] Navigation usability
- [ ] Desktop testing (1024px+):
  - [ ] Widescreen layout
  - [ ] High-resolution images
  - [ ] Hover states

## User Interface
### Theme Testing
- [ ] Light mode:
  - [ ] Text readability
  - [ ] Contrast ratios (WCAG 2.1)
  - [ ] Button states
  - [ ] Form elements
- [ ] Dark mode:
  - [ ] Text readability
  - [ ] Contrast ratios (WCAG 2.1)
  - [ ] Button states
  - [ ] Form elements
- [ ] Theme switching:
  - [ ] Smooth transition
  - [ ] No flickering
  - [ ] State persistence

### Visual Consistency
- [ ] Typography:
  - [ ] Consistent font usage
  - [ ] Proper hierarchy
  - [ ] Line heights
- [ ] Spacing:
  - [ ] Consistent padding
  - [ ] Proper margins
  - [ ] Element alignment
- [ ] Images:
  - [ ] No broken images
  - [ ] Proper scaling
  - [ ] Alt text present

## Performance
### Lighthouse Audit
- [ ] Accessibility score:
  - [ ] Color contrast
  - [ ] ARIA labels
  - [ ] Keyboard navigation
- [ ] SEO score:
  - [ ] Meta descriptions
  - [ ] Title tags
  - [ ] Semantic HTML
- [ ] Performance score:
  - [ ] Load time
  - [ ] First contentful paint
  - [ ] Time to interactive

### Technical Validation
- [ ] Console check:
  - [ ] No JS errors
  - [ ] No 404 resources
  - [ ] Clean console logs
- [ ] Link validation:
  - [ ] Internal links
  - [ ] External links
  - [ ] Download links
- [ ] Form validation:
  - [ ] Input validation
  - [ ] Form submission
  - [ ] Error handling

### Additional Checks
- [ ] Content loading:
  - [ ] Progressive loading
  - [ ] Placeholder states
  - [ ] Error states
- [ ] Network conditions:
  - [ ] Slow 3G
  - [ ] Offline capability
  - [ ] Recovery from disconnection