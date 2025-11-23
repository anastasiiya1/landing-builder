-- Set replica identity for the landings table
ALTER TABLE landings REPLICA IDENTITY FULL;

-- Update the landings table to include color palette and timestamps
ALTER TABLE landings 
ADD COLUMN IF NOT EXISTS color_palette JSONB DEFAULT '{"primary": "#8B5CF6", "secondary": "#A855F7", "accent": "#EC4899", "background": "#000000"}';

ALTER TABLE landings 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE landings 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE landings 
ADD COLUMN IF NOT EXISTS company_name VARCHAR(255) DEFAULT 'LandingBuilder';

-- Create a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if it exists and recreate it
DROP TRIGGER IF EXISTS update_landings_updated_at ON landings;
CREATE TRIGGER update_landings_updated_at 
BEFORE UPDATE ON landings 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update existing records to have default color palette if they don't have one
UPDATE landings 
SET color_palette = '{"primary": "#8B5CF6", "secondary": "#A855F7", "accent": "#EC4899", "background": "#000000"}'
WHERE color_palette IS NULL;