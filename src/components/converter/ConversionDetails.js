import React, { memo } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Tooltip,
  useTheme,
  Collapse,
  useMediaQuery
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLanguage } from '../../contexts/LanguageContext';
import PropTypes from 'prop-types';
import Paper from '../common/Paper';

// Memoize ResultBox for performance
const ResultBox = memo(({ label, value, copyable = true, onCopy, copied }) => {
  const theme = useTheme();
  const { t } = useLanguage();

  return (
    <Box
      role="region"
      aria-label={label}
      sx={{
        p: 2,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.grey[900] 
          : theme.palette.grey[50],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[100]
        }
      }}
    >
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          component="span"
          sx={{
            fontSize: theme.typography.caption.fontSize,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mb: 0.5,
            display: 'block'
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontSize: theme.typography.body1.fontSize,
            fontWeight: 500,
            wordBreak: 'break-word'
          }}
        >
          {value}
        </Typography>
      </Box>
      {copyable && (
        <Tooltip 
          title={copied ? t('common.copied') : t('common.copy')} 
          arrow
          placement="top"
        >
          <IconButton
            onClick={() => onCopy(value)}
            size="medium"
            aria-label={t('common.copy')}
            aria-pressed={copied}
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.action.hover
              },
              '&:active': {
                backgroundColor: theme.palette.action.selected,
                transform: 'scale(0.95)'
              },
              '&:focus-visible': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: 2
              }
            }}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
});

ResultBox.displayName = 'ResultBox';

const ConversionDetails = ({ result, sx = {} }) => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, []);

  return (
    <Paper
      elevation={0}
      role="region"
      aria-label={t('common.result')}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        ...sx
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}
      >
        <ResultBox
          label={t('common.from')}
          value={result.from.formatted}
          onCopy={handleCopy}
          copied={copied}
        />
        <ResultBox
          label={t('common.to')}
          value={result.to.formatted}
          onCopy={handleCopy}
          copied={copied}
        />
        {result.formula && (
          <ResultBox
            label={t('common.formula')}
            value={result.formula}
            copyable={false}
          />
        )}
        {result.steps && result.steps.length > 0 && (
          <Box
            role="region"
            aria-label={t('common.steps')}
            sx={{
              p: 2,
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.mode === 'dark' 
                ? theme.palette.grey[900] 
                : theme.palette.grey[50]
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              component="h3"
              sx={{
                fontSize: theme.typography.caption.fontSize,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 1,
                display: 'block'
              }}
            >
              {t('common.steps')}
            </Typography>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              {result.steps.map((step, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  component="li"
                  sx={{
                    fontSize: theme.typography.body2.fontSize,
                    lineHeight: 1.6,
                    mb: index < result.steps.length - 1 ? 1 : 0
                  }}
                >
                  {step}
                </Typography>
              ))}
            </ol>
          </Box>
        )}
      </Box>
      <Collapse in={copied}>
        <Box
          role="alert"
          aria-live="polite"
          sx={{
            mt: 2,
            p: 1,
            borderRadius: theme.shape.borderRadius,
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
            textAlign: 'center'
          }}
        >
          <Typography variant="body2">
            {t('common.copied')}
          </Typography>
        </Box>
      </Collapse>
    </Paper>
  );
};

ConversionDetails.propTypes = {
  result: PropTypes.shape({
    from: PropTypes.shape({
      unit: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      formatted: PropTypes.string.isRequired
    }).isRequired,
    to: PropTypes.shape({
      unit: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      formatted: PropTypes.string.isRequired
    }).isRequired,
    formula: PropTypes.string,
    steps: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  sx: PropTypes.object
};

export default memo(ConversionDetails); 